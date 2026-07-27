import React, { useState, useEffect } from "react";
import { User, Domain, Project } from "./types";
import { DOMAINS_DATA } from "./data/domains";
import { PROJECTS_DATA } from "./data/projects";
import { Navbar } from "./components/Navbar";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { DomainPage } from "./components/DomainPage";
import { ProjectDetailsPage } from "./components/ProjectDetailsPage";
import { DocReaderModal } from "./components/DocReaderModal";

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("ai_hub_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showGlobalDocReader, setShowGlobalDocReader] = useState(false);
  
  // Theme mode management (Light / Dark)
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("ai_hub_theme");
    if (saved === "dark" || saved === "light") return saved;
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("ai_hub_theme", theme);
  }, [theme]);

  const handleLoginSuccess = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("ai_hub_user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("ai_hub_user");
    setSelectedDomain(null);
    setSelectedProject(null);
  };

  const handleNavigateHome = () => {
    setSelectedDomain(null);
    setSelectedProject(null);
    setShowGlobalDocReader(false);
  };

  const handleSelectDomain = (domain: Domain) => {
    setSelectedDomain(domain);
    setSelectedProject(null);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  // If user is logged out, show Login Page
  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors">
      
      {/* Top Header Navbar */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        onNavigateHome={handleNavigateHome}
        activeDomainName={selectedDomain?.name}
        activeProjectName={selectedProject?.name}
        onOpenDocReader={selectedProject ? () => setShowGlobalDocReader(true) : undefined}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Page Content Router */}
      <main>
        {selectedProject ? (
          <ProjectDetailsPage
            project={selectedProject}
            onBackToDomain={() => setSelectedProject(null)}
          />
        ) : selectedDomain ? (
          <DomainPage
            domain={selectedDomain}
            onSelectProject={handleSelectProject}
            onBackToDashboard={() => setSelectedDomain(null)}
          />
        ) : (
          <Dashboard
            onSelectDomain={handleSelectDomain}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </main>

      {/* Global Doc Reader Modal */}
      {showGlobalDocReader && selectedProject && (
        <DocReaderModal
          project={selectedProject}
          onClose={() => setShowGlobalDocReader(false)}
        />
      )}

      {/* App Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-center text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="font-bold text-slate-200 block">AI Project Hub © 2026</span>
            <span>Comprehensive Documentation & AI Project Discussion Platform</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>20 Engineering Domains</span>
            <span>•</span>
            <span>15 Documentation Sections</span>
            <span>•</span>
            <span>Gemini AI Assistant</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
