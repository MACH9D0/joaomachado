import React from 'react';
import { SkillCategory } from '../types';
import { Cpu, ShieldCheck, Network, Terminal, Code2, Wrench, Server, Cloud, Database, ShieldAlert } from 'lucide-react';

interface SkillCardProps {
  category: SkillCategory;
}

const getIcon = (iconName: string) => {
  const props = { className: "w-5 h-5 text-cyber-neon" };
  switch (iconName) {
    case 'Cpu': return <Cpu {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    case 'Network': return <Network {...props} />;
    case 'Terminal': return <Terminal {...props} />;
    case 'Code2': return <Code2 {...props} />;
    case 'Wrench': return <Wrench {...props} />;
    case 'Server': return <Server {...props} />;
    case 'Cloud': return <Cloud {...props} />;
    case 'Database': return <Database {...props} />;
    case 'ShieldAlert': return <ShieldAlert {...props} />;
    default: return <Terminal {...props} />;
  }
};

export const SkillCard: React.FC<SkillCardProps> = ({ category }) => {
  return (
    <div className="bg-cyber-dark/50 border border-cyber-dim/20 p-6 rounded transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyber-neon hover:shadow-[0_0_20px_rgba(102,252,241,0.15)] group">
      <h3 className="text-xl font-mono font-bold text-white mb-6 flex items-center border-b border-cyber-dim/20 pb-2">
        <span className="text-cyber-neon mr-2">./</span>
        {category.title}
      </h3>
      <ul className="space-y-4">
        {category.skills.map((skill, idx) => (
          <li key={idx} className="flex items-center text-cyber-text group-hover:text-white transition-colors">
            <span className="mr-3 bg-cyber-bg p-2 rounded border border-cyber-dim/20">
              {getIcon(skill.icon)}
            </span>
            <span className="font-sans font-medium">{skill.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};