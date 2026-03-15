import React from 'react';
import { Project } from '../types';
import { FolderCode, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      onClick={() => onClick(project)}
      className="bg-cyber-bg border border-cyber-dim/30 rounded p-6 relative overflow-hidden group transition-all duration-300 hover:border-cyber-neon hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(102,252,241,0.15)] cursor-pointer h-full flex flex-col"
    >
      {/* Top Bar Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-dim to-cyber-neon opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start mb-4">
        <FolderCode className="text-cyber-neon w-8 h-8" />
        <div className="text-cyber-dim group-hover:text-cyber-neon transition-colors">
            <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-cyber-neon transition-colors">
        {project.title}
      </h3>
      
      <p className="text-cyber-text mb-6 text-sm leading-relaxed line-clamp-3">
        {project.description}
      </p>

      <div className="mb-4">
        <span className={`text-xs font-mono py-1 px-2 rounded border ${
          project.status === 'Completed' ? 'border-green-500/30 text-green-400 bg-green-900/10' :
          project.status === 'In Progress' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-900/10' :
          'border-gray-500/30 text-gray-400'
        }`}>
          [{project.status.toUpperCase()}]
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.slice(0, 3).map((tag, idx) => (
          <span key={idx} className="text-xs font-mono text-cyber-neon/80">
            #{tag}
          </span>
        ))}
        {project.tags.length > 3 && (
            <span className="text-xs font-mono text-cyber-neon/80">+{project.tags.length - 3}</span>
        )}
      </div>
    </div>
  );
};