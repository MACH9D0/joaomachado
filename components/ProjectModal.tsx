import React, { useEffect } from 'react';
import { X, ExternalLink, Terminal } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-cyber-dark border border-cyber-neon/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-[0_0_30px_rgba(102,252,241,0.2)] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-cyber-dim/20 sticky top-0 bg-cyber-dark/95 backdrop-blur z-10">
            <div>
                 <h2 className="text-xl sm:text-2xl font-mono font-bold text-white flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-cyber-neon" />
                    <span>{project.title}</span>
                 </h2>
                 <div className="mt-2">
                    <span className={`text-xs font-mono py-1 px-2 rounded border ${
                      project.status === 'Completed' ? 'border-green-500/30 text-green-400 bg-green-900/10' :
                      project.status === 'In Progress' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-900/10' :
                      'border-gray-500/30 text-gray-400'
                    }`}>
                      STATUS: {project.status.toUpperCase()}
                    </span>
                 </div>
            </div>
            <button 
                onClick={onClose}
                className="text-cyber-dim hover:text-cyber-neon transition-colors p-1 rounded hover:bg-cyber-dim/10 hover:shadow-[0_0_10px_rgba(102,252,241,0.3)]"
            >
                <X size={24} />
            </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
            {/* Description */}
            <div className="space-y-4">
                <h3 className="text-lg font-mono text-cyber-neon border-l-4 border-cyber-neon pl-3">
                  /var/log/description
                </h3>
                <p className="text-cyber-text leading-relaxed text-base sm:text-lg">
                    {project.longDescription || project.description}
                </p>
            </div>

            {/* Tags */}
            <div>
                <h3 className="text-lg font-mono text-cyber-neon mb-4 border-l-4 border-cyber-dim pl-3">
                  /etc/technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-sm font-mono text-cyber-bg bg-cyber-dim px-3 py-1 rounded">
                        #{tag}
                    </span>
                    ))}
                </div>
            </div>

             {/* Links if any */}
             {project.links && project.links.length > 0 && (
                 <div>
                     <h3 className="text-lg font-mono text-cyber-neon mb-4 border-l-4 border-white pl-3">
                       /mnt/links
                     </h3>
                     <div className="flex flex-wrap gap-4">
                         {project.links.map((link, idx) => (
                             <a 
                                key={idx} 
                                href={link.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center gap-2 px-5 py-3 border border-cyber-dim hover:border-cyber-neon text-cyber-text hover:text-cyber-neon transition-all duration-300 rounded group bg-cyber-bg/50 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(102,252,241,0.25)]"
                             >
                                <ExternalLink size={18} />
                                {link.label}
                             </a>
                         ))}
                     </div>
                 </div>
             )}
        </div>
        
        {/* Footer decoration */}
        <div className="p-4 border-t border-cyber-dim/20 bg-cyber-bg/50 mt-auto">
            <p className="font-mono text-xs text-cyber-dim text-center">
                // END OF FILE
            </p>
        </div>
      </div>
    </div>
  );
};