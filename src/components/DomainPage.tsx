import React, { useState, useMemo } from "react";
import { Domain, Project, CategoryFilter } from "../types";
import { getProjectsForDomain } from "../data/projects";
import { 
  ArrowLeft, 
  Search, 
  Sparkles, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Filter,
  Tag,
  Star
} from "lucide-react";

interface DomainPageProps {
  domain: Domain;
  onSelectProject: (project: Project) => void;
  onBackToDashboard: () => void;
}

export const DomainPage: React.FC<DomainPageProps> = ({
  domain,
  onSelectProject,
  onBackToDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  // Get full list of projects for this domain (guaranteed minimum 20 items)
  const displayProjects: Project[] = useMemo(() => {
    return getProjectsForDomain(domain.id);
  }, [domain.id]);

  // Filter projects by tab, difficulty, and search query
  const filteredProjects = displayProjects.filter((p) => {
    const matchesTab = activeTab === "all" || p.category === activeTab;
    const matchesDifficulty = difficultyFilter === "all" || p.difficulty === difficultyFilter;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Domain Top Bar */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors mb-4 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Domains</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
                <Layers className="w-3.5 h-3.5" />
                <span>Selected Domain</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {domain.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
                {domain.longDescription}
              </p>
            </div>

            <div className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-right hidden md:block">
              <span className="text-xs font-semibold text-slate-500 block">Available Documentations</span>
              <span className="text-xl font-bold text-slate-900">{filteredProjects.length} Projects Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Category Tabs & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs mb-8">
          
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Projects ({displayProjects.length})
            </button>
            <button
              onClick={() => setActiveTab("trending")}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "trending"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Trending Projects
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "recent"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Recently Added
            </button>
            <button
              onClick={() => setActiveTab("recommended")}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "recommended"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Recommended
            </button>
            <button
              onClick={() => setActiveTab("existing")}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "existing"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Existing Projects
            </button>
          </div>

          {/* Search & Difficulty Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

        </div>

        {/* Project Cards List */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center my-8">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">No matching projects in this category</h3>
            <p className="text-xs text-slate-500 mb-4">Try clearing filters or switching category tabs.</p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
                setDifficultyFilter("all");
              }}
              className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-6 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Difficulty Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      project.category === "trending" 
                        ? "bg-orange-50 text-orange-700 border border-orange-200" 
                        : project.category === "recommended"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : project.category === "recent"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                    }`}>
                      {project.category}
                    </span>

                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                      project.difficulty === "Beginner" 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : project.difficulty === "Intermediate" 
                        ? "bg-amber-50 text-amber-700 border border-amber-200" 
                        : "bg-purple-50 text-purple-700 border border-purple-200"
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>

                  {/* Project Name & Short Description */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                      >
                        <Tag className="w-2.5 h-2.5 text-slate-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{project.rating}</span>
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer group-hover:scale-[1.02]"
                  >
                    <span>View Details & Documentation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
