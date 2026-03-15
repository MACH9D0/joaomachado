export interface SkillItem {
  name: string;
  icon: string; // Using string identifiers for Lucide icons
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string; // Detailed info for modal
  tags: string[];
  status: 'Completed' | 'In Progress' | 'Planned';
  links?: ProjectLink[];
}
