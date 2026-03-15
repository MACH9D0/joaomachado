import React, { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Experiência', href: '#experiencia' },
    { name: 'Skills', href: '#skills' },
    { name: 'Lab', href: '#lab' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-cyber-bg/90 backdrop-blur-md border-b border-cyber-dim/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center font-mono text-cyber-neon font-bold text-lg hover:text-white hover:drop-shadow-[0_0_5px_rgba(102,252,241,0.8)] transition-all cursor-pointer">
            <Terminal className="w-5 h-5 mr-2" />
            <span>root@joao:~#</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="font-mono text-sm text-cyber-text hover:text-cyber-neon transition-all duration-300 relative group hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(102,252,241,0.6)]"
                >
                  <span className="text-cyber-neon mr-1 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cyber-neon hover:text-white p-2 hover:drop-shadow-[0_0_5px_rgba(102,252,241,0.8)] transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-cyber-dark border-b border-cyber-dim/30 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-cyber-text hover:text-cyber-neon hover:bg-cyber-bg block px-3 py-2 rounded-md text-base font-mono border-l-2 border-transparent hover:border-cyber-neon transition-all hover:pl-4 hover:shadow-[inset_10px_0_20px_-10px_rgba(102,252,241,0.1)]"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};