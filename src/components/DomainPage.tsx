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
    <div className="min-h-screen bg-[#F1F2F5] pb-20 font-sans">
      
      {/* Domain Top Hero Bar - `#2A374E` */}
      <div className="bg-[#2A374E] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#38475F] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8C9DD] hover:text-white transition-colors mb-4 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Domains</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F98DC]/20 border border-[#63A0D9]/40 text-[#B8C9DD] text-xs font-semibold mb-3">
                <Layers className="w-3.5 h-3.5 text-[#1F98DC]" />
                <span>Selected Engineering Domain</span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {domain.name}
              </h1>
              
              <p className="text-xs sm:text-sm text-[#B8C9DD] max-w-2xl mt-2 leading-relaxed">
                {domain.longDescription}
              </p>
            </div>

            <div className="bg-[#38475F]/80 border border-[#63A0D9]/30 rounded-2xl px-5 py-3.5 text-right hidden md:block shrink-0 shadow-xs">
              <span className="text-xs font-semibold text-[#B8C9DD] block">Available Projects</span>
              <span className="text-xl font-extrabold text-white">{displayProjects.length} Projects Ready</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Category Tabs & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#FFFFFF] p-3.5 rounded-2xl border border-[#E5E7EB] shadow-xs mb-8">
          
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#2A374E] text-white shadow-xs"
                  : "text-[#6A7788] hover:bg-[#F1F2F5] hover:text-[#12171F]"
              }`}
            >
              All Projects ({displayProjects.length})
            </button>
            <button
              onClick={() => setActiveTab("trending")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "trending"
                  ? "bg-[#F59E0B] text-white shadow-xs"
                  : "text-[#6A7788] hover:bg-[#F1F2F5] hover:text-[#12171F]"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "recent"
                  ? "bg-[#1F98DC] text-white shadow-xs"
                  : "text-[#6A7788] hover:bg-[#F1F2F5] hover:text-[#12171F]"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Recently Added</span>
            </button>
            <button
              onClick={() => setActiveTab("recommended")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "recommended"
                  ? "bg-[#22C55E] text-white shadow-xs"
                  : "text-[#6A7788] hover:bg-[#F1F2F5] hover:text-[#12171F]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended</span>
            </button>
            <button
              onClick={() => setActiveTab("existing")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "existing"
                  ? "bg-[#38475F] text-white shadow-xs"
                  : "text-[#6A7788] hover:bg-[#F1F2F5] hover:text-[#12171F]"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Existing Systems</span>
            </button>
          </div>

          {/* Search & Difficulty Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-[#6A7788] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F1F2F5] border border-[#E5E7EB] rounded-lg text-[#12171F] placeholder-[#6A7788] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC]"
              />
            </div>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="py-1.5 px-3 text-xs bg-[#F1F2F5] border border-[#E5E7EB] rounded-lg text-[#12171F] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] cursor-pointer font-medium"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-12 text-center my-8 shadow-xs">
            <Filter className="w-10 h-10 text-[#6A7788] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#12171F] mb-1">No matching projects found</h3>
            <p className="text-xs text-[#6A7788] mb-4">Try clearing your search query or selecting another category.</p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
                setDifficultyFilter("all");
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#1F98DC] text-white rounded-lg hover:bg-[#63A0D9] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] hover:border-[#63A0D9] p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Difficulty Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      project.category === "trending" 
                        ? "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30" 
                        : project.category === "recommended"
                        ? "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30"
                        : project.category === "recent"
                        ? "bg-[#1F98DC]/10 text-[#1F98DC] border-[#1F98DC]/30"
                        : "bg-[#38475F]/10 text-[#38475F] border-[#38475F]/30"
                    }`}>
                      {project.category}
                    </span>

                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#F1F2F5] text-[#6A7788] border border-[#E5E7EB]">
                      {project.difficulty}
                    </span>
                  </div>

                  {/* Project Name & Short Description */}
                  <h3 className="text-base font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors mb-2 leading-snug">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#6A7788] leading-relaxed mb-4 line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[10px] font-medium bg-[#F1F2F5] text-[#6A7788] px-2 py-0.5 rounded-md border border-[#E5E7EB]"
                      >
                        <Tag className="w-2.5 h-2.5 text-[#1F98DC]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[#F59E0B] font-semibold">
                    <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
                    <span>{project.rating}</span>
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#1F98DC] hover:bg-[#63A0D9] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer group-hover:scale-[1.02]"
                  >
                    <span>View Details</span>
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
