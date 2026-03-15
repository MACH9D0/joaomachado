import React, { useEffect, useRef } from 'react';

// Tipos de dispositivos baseados em ícones padrão de topologia
type DeviceType = 'CLOUD' | 'FIREWALL' | 'ROUTER' | 'SWITCH' | 'SERVER' | 'PC';

interface Device {
  id: number;
  x: number;
  y: number;
  type: DeviceType;
  connections: number[];
  label?: string;
  ip?: string;
}

type PacketType = 'HTTP' | 'SSH' | 'ICMP' | 'DB';

interface Packet {
  sourceId: number;
  targetId: number;
  progress: number;
  type: PacketType; 
  color: string;
  speed: number;
}

export const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configuração de cores do tema
    const colors = {
      line: 'rgba(31, 40, 51, 0.4)', // Linhas mais sutis
      iconStroke: '#45a29e', // Ciano escuro
      iconFill: '#0b0c10',   // Fundo quase preto
      text: 'rgba(69, 162, 158, 0.7)',
      ipText: 'rgba(59, 110, 114, 0.6)'
    };

    const protocolColors: Record<PacketType, string> = {
        HTTP: '#66fcf1', // Neon Cyan (Web)
        SSH: '#ff9f43',  // Orange (Admin)
        ICMP: '#ff6b6b', // Red (Ping/Alert)
        DB: '#a55eea'    // Purple (Data)
    };

    const devices: Device[] = [];
    const packets: Packet[] = [];
    let deviceIdCounter = 0;

    // Função para criar a topologia hierárquica expandida
    const initTopology = () => {
      devices.length = 0;
      packets.length = 0;
      deviceIdCounter = 0;

      const centerX = width / 2;
      const layerH = height / 6; 

      // 1. CLOUD (Internet) - Topo
      const cloud: Device = {
        id: deviceIdCounter++,
        x: centerX,
        y: layerH * 0.8,
        type: 'CLOUD',
        connections: [],
        label: 'ISP',
        ip: '203.0.113.1'
      };
      devices.push(cloud);

      // 2. FIREWALL (Perímetro)
      const firewall: Device = {
        id: deviceIdCounter++,
        x: centerX,
        y: layerH * 1.5,
        type: 'FIREWALL',
        connections: [cloud.id],
        label: 'FW-Edge',
        ip: '192.168.1.1'
      };
      devices.push(firewall);

      // 3. CORE ROUTER
      const router: Device = {
        id: deviceIdCounter++,
        x: centerX,
        y: layerH * 2.2,
        type: 'ROUTER',
        connections: [firewall.id],
        label: 'R1-Core',
        ip: '192.168.1.254'
      };
      devices.push(router);

      // 3.1 SERVERS
      const server1: Device = {
        id: deviceIdCounter++,
        x: centerX + 120,
        y: layerH * 2.2,
        type: 'SERVER',
        connections: [router.id],
        label: 'Srv-AD',
        ip: '192.168.1.10'
      };
      devices.push(server1);
      
      const server2: Device = {
        id: deviceIdCounter++,
        x: centerX - 120,
        y: layerH * 2.2,
        type: 'SERVER',
        connections: [router.id],
        label: 'Srv-Web',
        ip: '192.168.1.11'
      };
      devices.push(server2);

      // 4. SWITCHES (Distribuição)
      const switchSpacing = 200; 
      const maxSwitches = Math.floor((width * 0.9) / switchSpacing);
      const switchCount = Math.max(3, maxSwitches); 
      
      const switches: Device[] = [];
      const startX = (width - ((switchCount - 1) * switchSpacing)) / 2;

      for (let i = 0; i < switchCount; i++) {
        const swX = startX + (i * switchSpacing);
        const sw: Device = {
          id: deviceIdCounter++,
          x: swX,
          y: layerH * 3.5, 
          type: 'SWITCH',
          connections: [router.id],
          label: `SW-${i+1}`,
          ip: `192.168.1.${20 + i}`
        };
        devices.push(sw);
        switches.push(sw);
      }

      // 5. PCs (Acesso)
      let pcGlobalCount = 0;
      switches.forEach((sw, idx) => {
        const pcCount = Math.floor(Math.random() * 2) + 2; 
        
        for (let j = 0; j < pcCount; j++) {
            const pcOffsetX = (j - (pcCount - 1) / 2) * 60;
            const pc: Device = {
                id: deviceIdCounter++,
                x: sw.x + pcOffsetX,
                y: sw.y + 100 + (Math.random() * 30),
                type: 'PC',
                connections: [sw.id],
                label: `PC-${idx+1}.${j+1}`,
                ip: `192.168.1.${100 + pcGlobalCount}`
            };
            devices.push(pc);
            pcGlobalCount++;
        }
      });
    };

    // --- Desenho dos Ícones ---
    const drawCloud = (x: number, y: number) => {
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.arc(x - 18, y + 5, 18, 0, Math.PI * 2);
        ctx.arc(x + 18, y + 5, 18, 0, Math.PI * 2);
        ctx.arc(x, y + 12, 18, 0, Math.PI * 2);
        ctx.fillStyle = colors.iconFill;
        ctx.fill();
        ctx.strokeStyle = colors.iconStroke;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    };

    const drawRouter = (x: number, y: number) => {
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fillStyle = colors.iconFill;
        ctx.fill();
        ctx.strokeStyle = colors.iconStroke;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        ctx.beginPath();
        const s = 10;
        ctx.moveTo(x - s, y - s); ctx.lineTo(x, y);
        ctx.moveTo(x, y); ctx.lineTo(x + s, y + s);
        ctx.moveTo(x + s, y - s); ctx.lineTo(x, y);
        ctx.moveTo(x, y); ctx.lineTo(x - s, y + s);
        ctx.stroke();
    };

    const drawSwitch = (x: number, y: number) => {
        const s = 36;
        ctx.fillStyle = colors.iconFill;
        ctx.fillRect(x - s/2, y - s/2, s, s);
        ctx.strokeStyle = colors.iconStroke;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x - s/2, y - s/2, s, s);

        ctx.beginPath();
        const arrS = 10;
        ctx.moveTo(x - arrS, y - 5); ctx.lineTo(x + arrS, y - 5);
        ctx.lineTo(x + arrS - 4, y - 9);
        ctx.moveTo(x + arrS, y + 5); ctx.lineTo(x - arrS, y + 5);
        ctx.lineTo(x - arrS + 4, y + 9);
        ctx.stroke();
    };

    const drawFirewall = (x: number, y: number) => {
        const w = 44;
        const h = 24;
        ctx.fillStyle = colors.iconFill;
        ctx.fillRect(x - w/2, y - h/2, w, h);
        ctx.strokeStyle = colors.iconStroke;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x - w/2, y - h/2, w, h);
        
        ctx.beginPath();
        ctx.moveTo(x - w/2, y); ctx.lineTo(x + w/2, y);
        ctx.moveTo(x, y - h/2); ctx.lineTo(x, y);
        ctx.moveTo(x - w/4, y); ctx.lineTo(x - w/4, y + h/2);
        ctx.moveTo(x + w/4, y); ctx.lineTo(x + w/4, y + h/2);
        ctx.stroke();
    };

    const drawPC = (x: number, y: number) => {
        const w = 28;
        const h = 20;
        ctx.fillStyle = colors.iconFill;
        ctx.fillRect(x - w/2, y - h/2 - 5, w, h);
        ctx.strokeStyle = colors.iconStroke;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x - w/2, y - h/2 - 5, w, h);
        
        ctx.beginPath();
        ctx.moveTo(x - 8, y + h/2 - 5); 
        ctx.lineTo(x + 8, y + h/2 - 5);
        ctx.lineTo(x + 10, y + h/2 + 2);
        ctx.lineTo(x - 10, y + h/2 + 2);
        ctx.closePath();
        ctx.stroke();
    };

    const drawServer = (x: number, y: number) => {
        const w = 20;
        const h = 36;
        ctx.fillStyle = colors.iconFill;
        ctx.fillRect(x - w/2, y - h/2, w, h);
        ctx.strokeStyle = colors.iconStroke;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x - w/2, y - h/2, w, h);
        
        ctx.beginPath();
        ctx.moveTo(x - 6, y - 10); ctx.lineTo(x + 6, y - 10);
        ctx.moveTo(x - 6, y); ctx.lineTo(x + 6, y);
        ctx.moveTo(x - 6, y + 10); ctx.lineTo(x + 6, y + 10);
        ctx.stroke();
    };

    const drawPacket = (x: number, y: number, color: string, source: Device, target: Device) => {
        // Core Glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.fillStyle = color;

        // Pulsating size effect
        const pulse = (Math.sin(Date.now() / 100) + 1) / 2; // 0 to 1
        const size = 4 + (pulse * 2);

        // Draw Packet Head (Diamond or Rect)
        ctx.beginPath();
        ctx.rect(x - size/2, y - size/2, size, size);
        ctx.fill();

        // Draw Trail (Vector based)
        // Calcula vetor reverso para desenhar o rastro
        const dx = source.x - target.x;
        const dy = source.y - target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0) {
            const trailLen = 20;
            const normX = dx / dist;
            const normY = dy / dist;
            
            const gradient = ctx.createLinearGradient(x, y, x + normX * trailLen, y + normY * trailLen);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + normX * trailLen, y + normY * trailLen);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Reset shadow for other elements
        ctx.shadowBlur = 0;
    };

    // --- Loop de Animação ---
    const animate = () => {
      if (width !== window.innerWidth || height !== window.innerHeight) {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initTopology();
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (devices.length === 0) initTopology();

      // Desenhar Cabos
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      devices.forEach(device => {
          device.connections.forEach(targetId => {
              if (targetId < device.id) {
                  const target = devices.find(d => d.id === targetId);
                  if (target) {
                      ctx.moveTo(device.x, device.y);
                      ctx.lineTo(target.x, target.y);
                  }
              }
          });
      });
      ctx.stroke();

      // Gerar Tráfego
      if (Math.random() < 0.08) { // Aumentei frequência ligeiramente
        const endpoints = devices.filter(d => d.type === 'PC' || d.type === 'SERVER');
        const source = endpoints[Math.floor(Math.random() * endpoints.length)];
        
        if (source && source.connections.length > 0) {
            // Random packet type
            const types: PacketType[] = ['HTTP', 'SSH', 'ICMP', 'DB'];
            const pType = types[Math.floor(Math.random() * types.length)];

            packets.push({
                sourceId: source.id,
                targetId: source.connections[0],
                progress: 0,
                type: pType,
                color: protocolColors[pType],
                speed: 0.005 + (Math.random() * 0.01) // Velocidades variáveis
            });
        }
      }

      // Animar Pacotes
      for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i];
          const source = devices.find(d => d.id === p.sourceId);
          const target = devices.find(d => d.id === p.targetId);

          if (source && target) {
              p.progress += p.speed;

              const curX = source.x + (target.x - source.x) * p.progress;
              const curY = source.y + (target.y - source.y) * p.progress;

              drawPacket(curX, curY, p.color, source, target);

              if (p.progress >= 1) {
                  packets.splice(i, 1);
                  // Lógica de próximo salto (Next Hop)
                  if (target.type !== 'CLOUD' && target.type !== 'PC' && target.type !== 'SERVER') {
                     const nextHops = target.connections.filter(id => id !== source.id);
                     if (nextHops.length > 0) {
                         // Subir na hierarquia
                         const nextId = nextHops[0];
                         packets.push({
                             sourceId: target.id,
                             targetId: nextId,
                             progress: 0,
                             type: p.type,
                             color: p.color,
                             speed: p.speed
                         });
                     }
                  } else if (target.type === 'CLOUD') {
                      // Echo reply
                      packets.push({
                        sourceId: target.id,
                        targetId: source.id,
                        progress: 0,
                        type: p.type,
                        color: '#fdcb6e', // Resposta genérica (amarelo/ouro)
                        speed: p.speed
                      }); 
                  }
              }
          } else {
              packets.splice(i, 1);
          }
      }

      // Desenhar Dispositivos
      devices.forEach(d => {
        // Redraw shadows for icons for cool effect? No, keep clean.
        switch(d.type) {
            case 'CLOUD': drawCloud(d.x, d.y); break;
            case 'FIREWALL': drawFirewall(d.x, d.y); break;
            case 'ROUTER': drawRouter(d.x, d.y); break;
            case 'SWITCH': drawSwitch(d.x, d.y); break;
            case 'SERVER': drawServer(d.x, d.y); break;
            case 'PC': drawPC(d.x, d.y); break;
        }
        
        ctx.fillStyle = colors.text;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(d.label || '', d.x, d.y - 22);

        if (d.ip) {
            ctx.fillStyle = colors.ipText;
            ctx.font = '10px monospace';
            ctx.fillText(d.ip, d.x, d.y + 30);
        }
      });

      requestAnimationFrame(animate);
    };

    // Setup inicial
    canvas.width = width;
    canvas.height = height;
    initTopology();
    
    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.5 }} 
    />
  );
};