import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillCard } from './components/SkillCard';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { NetworkBackground } from './components/NetworkBackground';
import { SkillCategory, Project } from './types';
import { Linkedin, Mail, ShieldAlert, Copy, Check, Briefcase, GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  
  const contactEmail = "machadojoao2001@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // --- Data ---
  const skillCategories: SkillCategory[] = [
    {
      title: "IT Support & Admin",
      skills: [
        { name: "Windows Server & AD", icon: "Server" },
        { name: "Microsoft 365 & Azure", icon: "Cloud" },
        { name: "Hyper-V Virtualization", icon: "Database" },
        { name: "Hardware Assembly & Repair", icon: "Wrench" },
        { name: "System Troubleshooting", icon: "Cpu" },
      ]
    },
    {
      title: "Networking & Security",
      skills: [
        { name: "Linux (Kali / Ubuntu)", icon: "Terminal" },
        { name: "TCP/IP & OSI Model", icon: "Network" },
        { name: "Firewalls & VPNs", icon: "ShieldCheck" },
        { name: "PowerShell & Python", icon: "Code2" },
        { name: "Cisco Packet Tracer", icon: "Network" },
      ]
    },
    {
      title: "Academic Focus",
      skills: [
        { name: "Network Architecture", icon: "Network" },
        { name: "Cybersecurity Fundamentals", icon: "ShieldCheck" },
        { name: "Offensive & Defensive Sec", icon: "ShieldAlert" },
      ]
    }
  ];

  const projects: Project[] = [
    {
      title: "VLAN Segmentation Lab",
      description: "Implementação de segmentação de rede usando VLANs para separar tráfego de gestão, usuários e IoT, aumentando a segurança interna.",
      longDescription: "Neste laboratório extensivo, configurei switches Cisco Catalyst para dividir a infraestrutura de rede em múltiplas VLANs dedicadas (Gestão, Colaboradores, IoT e Convidados). Configurei troncos 802.1Q e implementei roteamento inter-VLAN com a técnica 'Router-on-a-Stick'. Adicionalmente, apliquei Access Control Lists (ACLs) rigorosas para garantir que dispositivos na VLAN IoT não pudessem acessar a rede de Gestão, reduzindo significativamente a superfície de ataque lateral.",
      tags: ["Cisco", "Switching", "Security", "ACLs", "VLAN"],
      status: "Completed",
      links: []
    },
    {
      title: "Linux Server Hardening",
      description: "Configuração de um servidor Ubuntu seguindo benchmarks CIS. Configuração de UFW, SSH Keys e Fail2Ban para mitigar ataques de força bruta.",
      longDescription: "Seguindo os rigorosos benchmarks CIS para Ubuntu Server, realizei o hardening completo de uma instância VPS crítica. As ações incluíram: configuração de firewall UFW com política 'deny by default', desabilitação total de login root via SSH, implementação exclusiva de autenticação baseada em chaves Ed25519, e configuração do Fail2Ban para banir IPs automaticamente após tentativas falhas de login. Também realizei auditoria de permissões de arquivos críticos e configurei atualizações de segurança automáticas.",
      tags: ["Linux", "Hardening", "SSH", "UFW", "Fail2Ban"],
      status: "In Progress",
       links: []
    },
    {
      title: "Wireshark Traffic Analysis",
      description: "Análise de capturas de pacotes para identificar anomalias de rede e assinaturas de malware simuladas em ambiente controlado.",
      longDescription: "Utilizei o Wireshark para dissecar arquivos PCAP gerados durante uma simulação de ataque Red Team vs Blue Team. Identifiquei com sucesso padrões de varredura de portas (SYN scans), tentativas de exfiltração de dados via DNS tunneling e credenciais transmitidas em texto claro (HTTP/Telnet). O projeto culminou em um relatório forense detalhado documentando os vetores de ataque, timestamps precisos e recomendações de mitigação para firewall.",
      tags: ["Forensics", "Networking", "Analysis", "Wireshark", "PCAP"],
      status: "Completed",
      links: []
    }
  ];

  return (
    // Removida a classe bg-cyber-bg daqui para permitir ver o canvas atrás, o body já tem a cor de fundo
    <div className="min-h-screen text-cyber-text font-sans selection:bg-cyber-neon selection:text-cyber-bg relative overflow-x-hidden">
      
      {/* Background Animado */}
      <NetworkBackground />

      {/* Navbar com z-index alto */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <section id="sobre" className="py-20 md:py-32 border-b border-cyber-dim/10 bg-cyber-bg/80 backdrop-blur-md rounded-xl my-8 p-8 border border-cyber-dim/20 shadow-lg">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="md:w-1/2">
                <h2 className="section-title text-3xl font-mono font-bold text-white mb-8 flex items-center">
                  <span className="text-cyber-neon mr-2">01.</span> Sobre Mim
                </h2>
                <div className="space-y-4 text-lg">
                  <p>
                    Atualmente, desempenho funções como <span className="text-cyber-neon">Técnico de Sistemas e Tecnologias de Informação na ULSMAVE</span>, onde resolvo diariamente problemas complexos de hardware e software.
                  </p>
                  <p>
                    No entanto, a minha verdadeira paixão reside na infraestrutura que conecta o mundo. Sou estudante de <span className="text-cyber-neon">Redes e Segurança Informática no IPCA</span>, onde aprofundo os meus conhecimentos em cibersegurança ofensiva e defensiva.
                  </p>
                  <p>
                    O meu objetivo é compreender não apenas como construir redes robustas, mas também como defendê-las contra ameaças modernas. Passo o meu tempo livre a configurar laboratórios, a estudar Linux e a explorar novas ferramentas de segurança.
                  </p>
                </div>
              </div>
              {/* Visual element for About */}
              <div className="md:w-1/2 flex justify-center items-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyber-neon to-cyber-dim rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-cyber-dark p-8 rounded-lg border border-cyber-dim/30 text-center">
                    <img 
                      src="/foto.jpg" 
                      alt="João Machado" 
                      className="w-48 h-48 rounded-full border-4 border-cyber-neon/50 object-cover mx-auto mb-6 shadow-[0_0_20px_rgba(102,252,241,0.3)]"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = "https://ui-avatars.com/api/?name=Jo%C3%A3o+Machado&background=0D1117&color=66FCF1&size=400&font-size=0.33";
                      }}
                    />
                    <p className="font-mono text-sm text-cyber-dim">
                      "Security is not a product, but a process."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience & Education Section */}
          <section id="experiencia" className="py-20 md:py-32">
            <h2 className="text-3xl font-mono font-bold text-white mb-12 flex items-center w-full">
              <span className="text-cyber-neon mr-2">02.</span> Experiência & Educação
              <span className="ml-4 h-px bg-cyber-dim/30 flex-grow max-w-xs"></span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Experience */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <Briefcase className="w-6 h-6 text-cyber-neon mr-3" />
                  Experiência Profissional
                </h3>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyber-dim/50 before:to-transparent">
                  
                  {/* ULSMAVE - Presente */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cyber-neon bg-cyber-dark text-cyber-neon shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(102,252,241,0.2)] z-10">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-cyber-dark/80 backdrop-blur p-6 rounded-lg border border-cyber-dim/20 hover:border-cyber-neon/50 transition-colors">
                      <div className="flex flex-col mb-4">
                        <h4 className="font-bold text-lg text-white">Técnico de Sistemas e Tecnologias de Informação</h4>
                        <span className="text-cyber-neon font-mono text-sm">ULSMAVE</span>
                        <span className="text-cyber-dim text-xs mt-1">Junho 2025 – Presente | Santo Tirso, Portugal</span>
                      </div>
                      <ul className="text-sm text-cyber-text space-y-2">
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Instalação, configuração e manutenção de hardware e software em ambiente hospitalar, incluindo servidores, workstations, dispositivos de comunicação e periféricos.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Administração e monitorização de infraestruturas tecnológicas críticas, garantindo disponibilidade, integridade e confidencialidade dos sistemas de saúde.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Prestação de suporte técnico presencial e remoto a centenas de utilizadores, com diagnóstico e resolução eficiente de incidentes.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Gestão de GPOs (Group Policy Objects) para configuração centralizada de políticas de segurança, restrições de acesso e standardização de ambientes de trabalho.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Implementação e gestão de políticas de segurança da informação: backups, controlo de acessos e recuperação de desastres.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Desenvolvimento de scripts PowerShell para automatização de tarefas operacionais recorrentes, reduzindo erros manuais e aumentando eficiência.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Participação ativa em projetos de renovação tecnológica e integração de novos sistemas clínicos e administrativos.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Elaboração de documentação técnica e manutenção de registos de configurações e procedimentos operacionais.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Planeamento e execução de planos de manutenção preventiva e corretiva dos sistemas informáticos.</span></li>
                      </ul>
                    </div>
                  </div>

                  {/* IGINT - SPMS / ULSMAVE */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cyber-dim bg-cyber-dark text-cyber-dim shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-cyber-dark/80 backdrop-blur p-6 rounded-lg border border-cyber-dim/20 hover:border-cyber-dim/50 transition-colors">
                      <div className="flex flex-col mb-4">
                        <h4 className="font-bold text-lg text-white">Técnico de Suporte Local</h4>
                        <span className="text-cyber-neon font-mono text-sm">IGINT – SPMS / ULSMAVE</span>
                        <span className="text-cyber-dim text-xs mt-1">Julho 2024 – Junho 2025 | Santo Tirso, Portugal</span>
                      </div>
                      <ul className="text-sm text-cyber-text space-y-2">
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Suporte técnico presencial e remoto a utilizadores em ambiente de saúde pública, abrangendo mais de 300 equipamentos.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Instalação, manutenção e substituição de hardware: computadores, portáteis, impressoras e acessórios de rede.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Apoio e coordenação na execução de atualizações de software em massa (Windows Update, patches de segurança).</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Configuração e administração de servidores Windows Server, gestão de utilizadores em Active Directory.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Suporte técnico a impressoras de rede (configuração, diagnóstico e resolução de avarias).</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Deslocações a diferentes unidades de saúde para resolução de incidentes críticos no terreno.</span></li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* VB Informática */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cyber-dim bg-cyber-dark text-cyber-dim shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-cyber-dark/80 backdrop-blur p-6 rounded-lg border border-cyber-dim/20 hover:border-cyber-dim/50 transition-colors">
                      <div className="flex flex-col mb-4">
                        <h4 className="font-bold text-lg text-white">Técnico de Informática (Estágio)</h4>
                        <span className="text-cyber-neon font-mono text-sm">VB Informática</span>
                        <span className="text-cyber-dim text-xs mt-1">Setembro 2020 – Agosto 2021 | Santo Tirso, Portugal</span>
                      </div>
                      <ul className="text-sm text-cyber-text space-y-2">
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Análise, reparação e montagem de computadores, POS, portáteis e servidores para clientes empresariais.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Instalação e configuração de redes locais (LAN/Wi-Fi), incluindo cablagem estruturada e configuração de switches e routers.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Configuração de sistemas de faturação (Primavera, PHC) e assistência a clientes na sua utilização.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Instalação e configuração de sistemas de videovigilância (CCTV) para clientes comerciais.</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Gestão de infraestruturas informáticas de empresas clientes (manutenção de servidores, backups, segurança).</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Suporte remoto e atendimento ao balcão; emissão de faturas e gestão de documentos fiscais (SAFT).</span></li>
                        <li className="flex items-start"><span className="text-cyber-neon mr-2">▸</span><span>Responsável pela orientação de estagiários, transmitindo boas práticas técnicas.</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <GraduationCap className="w-6 h-6 text-cyber-neon mr-3" />
                  Formação Académica
                </h3>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyber-dim/50 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cyber-neon bg-cyber-dark text-cyber-neon shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(102,252,241,0.2)] z-10">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-cyber-dark/80 backdrop-blur p-6 rounded-lg border border-cyber-dim/20 hover:border-cyber-neon/50 transition-colors">
                      <div className="flex flex-col mb-2">
                        <h4 className="font-bold text-lg text-white">Redes e Segurança Informática</h4>
                        <span className="text-cyber-neon font-mono text-sm">IPCA / ETeSP</span>
                        <span className="text-cyber-dim text-xs mt-1">Em curso</span>
                      </div>
                      <p className="text-sm text-cyber-text">
                        Foco em arquitetura de redes, cibersegurança ofensiva e defensiva, administração de sistemas e implementação de políticas de segurança.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-20 md:py-32">
             <h2 className="text-3xl font-mono font-bold text-white mb-12 flex items-center w-full">
              <span className="text-cyber-neon mr-2">03.</span> Competências Técnicas
              <span className="ml-4 h-px bg-cyber-dim/30 flex-grow max-w-xs"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillCategories.map((cat, idx) => (
                <SkillCard key={idx} category={cat} />
              ))}
            </div>
          </section>

          {/* Lab/Projects Section */}
          <section id="lab" className="py-20 md:py-32">
            <h2 className="text-3xl font-mono font-bold text-white mb-12 flex items-center w-full">
              <span className="text-cyber-neon mr-2">04.</span> Home Lab
              <span className="ml-4 h-px bg-cyber-dim/30 flex-grow max-w-xs"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj, idx) => (
                <ProjectCard 
                  key={idx} 
                  project={proj} 
                  onClick={setSelectedProject}
                />
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contacto" className="py-20 md:py-32 text-center max-w-2xl mx-auto bg-cyber-dark/60 backdrop-blur-md p-8 rounded-xl border border-cyber-dim/20 my-8 shadow-[0_0_30px_rgba(69,162,158,0.1)]">
            <h2 className="text-cyber-neon font-mono mb-4 text-lg">05. O que se segue?</h2>
            <h3 className="text-4xl font-bold text-white mb-6">Entre em Contacto</h3>
            <p className="text-cyber-text mb-10 text-lg">
              Estou sempre aberto a novas oportunidades na área de segurança e redes, ou apenas para trocar ideias sobre tecnologia. A minha caixa de entrada está sempre aberta.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={`mailto:${contactEmail}?subject=Contacto via Portfolio`}
                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border border-cyber-neon text-cyber-bg bg-cyber-neon font-mono font-bold transition-all duration-300 rounded hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(102,252,241,0.6)]"
              >
                <Mail className="mr-2 w-5 h-5" />
                Enviar E-mail
              </a>

              <button 
                onClick={handleCopyEmail}
                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border border-cyber-dim text-cyber-neon hover:bg-cyber-neon/10 font-mono transition-all duration-300 rounded hover:-translate-y-1"
              >
                {emailCopied ? <Check className="mr-2 w-5 h-5" /> : <Copy className="mr-2 w-5 h-5" />}
                {emailCopied ? "Copiado!" : "Copiar Endereço"}
              </button>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="bg-cyber-dark/90 backdrop-blur py-8 text-center border-t border-cyber-dim/20 relative z-10">
          <div className="flex justify-center space-x-8 mb-6">
            <a href="https://www.linkedin.com/in/jo%C3%A3o-machado-518802172/" target="_blank" rel="noreferrer" className="text-cyber-text hover:text-cyber-neon hover:drop-shadow-[0_0_8px_rgba(102,252,241,0.8)] transform hover:-translate-y-1 transition-all">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          <p className="font-mono text-sm text-cyber-dim">
            System secured. &copy; 2026 João Machado
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Built with React & Tailwind
          </p>
        </footer>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default App;