
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ProjectEstimation {
  complexity: string;
  estimatedTimeline: string;
  techStack: string[];
  recommendations: string[];
}
