import React from "react";
import { Domain } from "../types";
import { DOMAINS_DATA } from "../data/domains";
import { 
  Bot, 
  BrainCircuit, 
  Globe, 
  Smartphone, 
  Cloud, 
  ShieldCheck, 
  Cpu, 
  BarChart3, 
  Blocks, 
  Glasses, 
  Cog, 
  HeartPulse, 
  Sprout, 
  GraduationCap, 
  DollarSign, 
  ShoppingBag, 
  Building2, 
  Share2, 
  Gamepad2, 
  Navigation,
  ArrowRight,
  Sparkles,
  Layers,
  Code2
} from "lucide-react";

interface DashboardProps {
  onSelectDomain: (domain: Domain) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Icon Mapping Helper
const getDomainIcon = (iconName: string) => {
  const className = "w-6 h-6";
  switch (iconName) {
    case "Bot": return <Bot className={className} />;
    case "BrainCircuit": return <BrainCircuit className={className} />;
    case "Globe": return <Globe className={className} />;
    case "Smartphone": return <Smartphone className={className} />;
    case "Cloud": return <Cloud className={className} />;
    case "ShieldCheck": return <ShieldCheck className={className} />;
    case "Cpu": return <Cpu className={className} />;
    case "BarChart3": return <BarChart3 className={className} />;
    case "Blocks": return <Blocks className={className} />;
    case "Glasses": return <Glasses className={className} />;
    case "Cog": return <Cog className={className} />;
    case "HeartPulse": return <HeartPulse className={className} />;
    case "Sprout": return <Sprout className={className} />;
    case "GraduationCap": return <GraduationCap className={className} />;
    case "DollarSign": return <DollarSign className={className} />;
    case "ShoppingBag": return <ShoppingBag className={className} />;
    case "Building2": return <Building2 className={className} />;
    case "Share2": return <Share2 className={className} />;
    case "Gamepad2": return <Gamepad2 className={className} />;
    case "Navigation": return <Navigation className={className} />;
    default: return <Code2 className={className} />;
  }
};

export const Dashboard: React.FC<DashboardProps> = ({
  onSelectDomain,
  searchQuery,
}) => {
  const filteredDomains = DOMAINS_DATA.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F1F2F5] pb-20 font-sans">
      
      {/* Hero Welcome Banner - `#2A374E` */}
      <div className="bg-[#2A374E] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#38475F] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F98DC]/20 border border-[#63A0D9]/40 text-[#B8C9DD] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#1F98DC]" />
            <span>AI Project Hub & College Research Repository</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 max-w-3xl">
            Explore Project Domains & Technical Documentations
          </h1>
          
          <p className="text-[#B8C9DD] text-sm sm:text-base max-w-2xl leading-relaxed mb-8">
            Select an engineering domain below to explore real-world project blueprints, complete 15-section documentations, copyable architecture snippets, and project-aware AI Chatbot support.
          </p>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            <div className="bg-[#38475F]/80 border border-[#63A0D9]/30 rounded-2xl p-4">
              <span className="text-2xl font-extrabold text-white block">20</span>
              <span className="text-xs text-[#B8C9DD] font-medium">Engineering Domains</span>
            </div>
            <div className="bg-[#38475F]/80 border border-[#63A0D9]/30 rounded-2xl p-4">
              <span className="text-2xl font-extrabold text-[#1F98DC] block">40+</span>
              <span className="text-xs text-[#B8C9DD] font-medium">Complete AI Projects</span>
            </div>
            <div className="bg-[#38475F]/80 border border-[#63A0D9]/30 rounded-2xl p-4">
              <span className="text-2xl font-extrabold text-white block">15</span>
              <span className="text-xs text-[#B8C9DD] font-medium">Doc Chapters / Paper</span>
            </div>
            <div className="bg-[#38475F]/80 border border-[#63A0D9]/30 rounded-2xl p-4">
              <span className="text-2xl font-extrabold text-[#22C55E] block">Gemini</span>
              <span className="text-xs text-[#B8C9DD] font-medium">AI Chat Assistant</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Domains Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#12171F] tracking-tight">
              Select Engineering & Computer Science Domain
            </h2>
            <p className="text-xs sm:text-sm text-[#6A7788] mt-0.5">
              Click any domain card to view featured projects, 15-section paper blueprints, and AI guidance.
            </p>
          </div>
          
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#6A7788] font-semibold bg-[#FFFFFF] border border-[#E5E7EB] px-3 py-1.5 rounded-lg shadow-2xs">
            <Layers className="w-4 h-4 text-[#1F98DC]" />
            <span>Showing {filteredDomains.length} Domains</span>
          </div>
        </div>

        {/* Domain Cards Grid - `#FFFFFF` background with `#E5E7EB` borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDomains.map((domain) => (
            <div
              key={domain.id}
              onClick={() => onSelectDomain(domain)}
              className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#63A0D9] transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2A374E] text-[#1F98DC] flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-[#1F98DC] group-hover:text-white transition-all">
                    {getDomainIcon(domain.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-[#6A7788] bg-[#F1F2F5] px-2.5 py-1 rounded-full border border-[#E5E7EB]">
                    {domain.totalProjects} Projects
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors mb-2">
                  {domain.name}
                </h3>

                <p className="text-xs text-[#6A7788] leading-relaxed line-clamp-3 mb-4">
                  {domain.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-bold text-[#1F98DC]">
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
