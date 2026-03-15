import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const roles = ["Técnico de Sistemas e Tecnologias de Informação", "Estudante de Redes e Segurança", "Network Enthusiast"];
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delta]);

  const tick = () => {
    const i = roleIndex % roles.length;
    const fullText = roles[i];
    const updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(50); // Faster deletion
    } else {
        setDelta(100); // Normal typing
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(2000); // Pause at end
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setRoleIndex(roleIndex + 1);
      setDelta(500); // Pause before next word
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background Decorativo Removido para mostrar NetworkBackground */}
      
      <div className="z-10 max-w-4xl w-full px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <p className="font-mono text-cyber-neon mb-4 tracking-widest animate-fade-in drop-shadow-[0_0_5px_rgba(102,252,241,0.5)]">
          Olá, mundo. Eu sou o
        </p>
        <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 font-sans tracking-tight">
          João Machado<span className="text-cyber-neon">.</span>
        </h1>
        
        <div className="h-12 sm:h-16 mb-8 flex items-center justify-center sm:justify-start">
          <span className="text-xl sm:text-3xl font-mono text-cyber-dim">
            &gt; <span className="text-gray-300">{text}</span>
            <span className="animate-blink border-r-2 border-cyber-neon ml-1 h-full inline-block align-middle">&nbsp;</span>
          </span>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <a 
            href="#lab"
            onClick={(e) => handleSmoothScroll(e, "#lab")}
            className="inline-flex items-center px-8 py-3 border border-cyber-neon text-cyber-neon font-mono text-sm transition-all duration-300 rounded group hover:bg-cyber-neon/10 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(102,252,241,0.5)] bg-cyber-bg/50 backdrop-blur-sm"
          >
            Ver o Meu Lab
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};