export type CategoryFilter = "all" | "existing" | "trending" | "recent" | "recommended";

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export interface ProjectModule {
  id: string;
  name: string;
  description: string;
  keyFunctions: string[];
}

export interface ProjectDocumentation {
  overview: string;
  problemStatement: string;
  objective: string;
  existingSystem: string;
  proposedSystem: string;
  technologiesUsed: {
    frontend: string[];
    backend: string[];
    aiServices: string[];
    database: string[];
    authentication: string[];
    deployment: string[];
  };
  architecture: string;
  architectureDiagramDesc: string;
  workflow: string;
  workflowSteps: string[];
  modules: ProjectModule[];
  features: string[];
  advantages: string[];
  limitations: string[];
  futureScope: string[];
  conclusion: string;
  systemRequirements?: {
    hardware: string[];
    software: string[];
  };
}

export interface Project {
  id: string;
  domainId: string;
  name: string;
  shortDescription: string;
  difficulty: DifficultyLevel;
  category: "existing" | "trending" | "recent" | "recommended";
  tags: string[];
  rating: number;
  author: string;
  updatedAt: string;
  documentation: ProjectDocumentation;
}

export interface Domain {
  id: string;
  name: string;
  iconName: string;
  shortDescription: string;
  longDescription: string;
  colorGradient: string;
  bgLight: string;
  totalProjects: number;
}

export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  avatar: string;
  provider: "email" | "google" | "github" | "guest";
  googleId?: string;
  createdAt?: string;
  lastLogin?: string;
  token?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  sectionContext?: string;
}
