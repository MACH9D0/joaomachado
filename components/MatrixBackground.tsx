import React, { useEffect, useRef } from 'react';

export const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const letters = '01'; 
    const fontSize = 14;
    const columns = width / fontSize;
    const drops: number[] = [];

    // Inicializar as gotas
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * height / fontSize; 
    }

    const draw = () => {
      // Fundo menos opaco para deixar o rastro durar um pouco mais, mas ainda limpar
      ctx.fillStyle = 'rgba(11, 12, 16, 0.08)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px monospace`; // Texto em bold para melhor visibilidade

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        
        // Aumentar probabilidade de brilho e intensidade das cores
        const isBright = Math.random() > 0.90;
        
        if (isBright) {
            ctx.fillStyle = '#66fcf1'; // Neon brilhante
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#66fcf1';
        } else {
            ctx.fillStyle = '#1f4045'; // Verde escuro mais visível que antes
            ctx.shadowBlur = 0;
        }
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Resetar gota
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50); 

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }} // Aumentar opacidade geral do canvas
    />
  );
};