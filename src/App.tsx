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
import { LandingPage } from "./components/LandingPage";

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
  
  // Navigation view state: "landing" (marketing overview) | "auth" (login/register screen) | "workspace" (active dashboard)
  const [viewMode, setViewMode] = useState<"landing" | "auth" | "workspace">(() => {
    return user ? "workspace" : "landing";
  });
  
  // Auth initial tab mode: "login" (opens Sign In tab) | "signup" (opens Create Account tab)
  const [authInitialMode, setAuthInitialMode] = useState<"login" | "signup">("login");

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

  // Verify active session with backend on startup
  useEffect(() => {
    const token = localStorage.getItem("ai_hub_token");
    if (token) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem("ai_hub_user", JSON.stringify(data.user));
          }
        })
        .catch((err) => {
          console.warn("Session check error:", err);
        });
    }
  }, []);

  // Guard authenticated users: prevent accessing auth (login/register) pages and route to workspace
  useEffect(() => {
    if (user && viewMode === "auth") {
      setViewMode("workspace");
    }
  }, [user, viewMode]);

  // Handle successful user authentication and redirect to main workspace dashboard
  const handleLoginSuccess = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("ai_hub_user", JSON.stringify(newUser));
    setViewMode("workspace");
  };

  // Handle user logout and redirect back to the product landing page
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // Ignore network errors on logout
    }
    setUser(null);
    localStorage.removeItem("ai_hub_user");
    localStorage.removeItem("ai_hub_token");
    setSelectedDomain(null);
    setSelectedProject(null);
    setViewMode("landing");
  };

  const handleNavigateHome = () => {
    setSelectedDomain(null);
    setSelectedProject(null);
    setShowGlobalDocReader(false);
    setViewMode("workspace");
  };

  const handleSelectDomain = (domain: Domain) => {
    setSelectedDomain(domain);
    setSelectedProject(null);
    setViewMode("workspace");
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setViewMode("workspace");
  };

  // Render logic for unauthenticated visitors
  if (!user) {
    // Render Authentication Screen (OTP Verification)
    if (viewMode === "auth") {
      return (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={() => setViewMode("landing")}
        />
      );
    }

    // Default: Render Enterprise SaaS Landing Page
    return (
      <LandingPage
        onSignInClick={() => setViewMode("auth")}
        onCreateAccountClick={() => setViewMode("auth")}
        onEnterWorkspace={() => setViewMode("auth")}
      />
    );
  }

  // If user is logged in but chooses to inspect the Landing Page
  if (viewMode === "landing") {
    return (
      <LandingPage
        onSignInClick={() => setViewMode("workspace")}
        onCreateAccountClick={() => setViewMode("workspace")}
        onEnterWorkspace={() => setViewMode("workspace")}
      />
    );
  }

  // Active Workspace View
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors">
      
      {/* Top Header Navbar */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        onNavigateHome={handleNavigateHome}
        onNavigateLanding={() => setViewMode("landing")}
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
