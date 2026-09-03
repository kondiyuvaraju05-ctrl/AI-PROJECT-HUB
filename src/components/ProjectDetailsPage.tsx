import React, { useState } from "react";
import { Project } from "../types";
import { AiChatbot } from "./AiChatbot";
import { DocReaderModal } from "./DocReaderModal";
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  BookOpen, 
  Layers, 
  Cpu, 
  Workflow, 
  Box, 
  CheckCircle2, 
  AlertTriangle, 
  Rocket, 
  FileText, 
  Tag, 
  Bot, 
  Printer, 
  Share2, 
  ExternalLink,
  Info,
  HelpCircle
} from "lucide-react";

interface ProjectDetailsPageProps {
  project: Project;
  onBackToDomain: () => void;
}

export const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({
  project,
  onBackToDomain,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [showDocReader, setShowDocReader] = useState(false);
  const [selectedChatSection, setSelectedChatSection] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<"doc" | "chat">("doc");

  const doc = project.documentation;

  const handleCopySection = (sectionName: string, textContent: string) => {
    navigator.clipboard.writeText(`## ${sectionName}\n\n${textContent}`);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const openDocSectionReader = (sectionTitle: string) => {
    setShowDocReader(true);
  };

  const handleAskSectionInChat = (sectionTitle: string) => {
    setSelectedChatSection(sectionTitle);
    setActiveTab("chat");
  };

  return (
    <div className="min-h-screen bg-[#F1F2F5] pb-20 font-sans">
      
      {/* Top Banner & Title Bar - `#2A374E` */}
      <div className="bg-[#2A374E] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#38475F]">
        <div className="max-w-7xl mx-auto">
          
          <button
            onClick={onBackToDomain}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8C9DD] hover:text-white transition-colors mb-6 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Domain Projects</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-extrabold px-3 py-1 bg-[#1F98DC]/20 text-[#B8C9DD] border border-[#63A0D9]/40 rounded-full uppercase tracking-wider">
                  Domain: {project.domainId.toUpperCase()}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 rounded-md">
                  {project.difficulty}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 rounded-md uppercase">
                  {project.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
                {project.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#B8C9DD] leading-relaxed mb-4">
                {project.shortDescription}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[10px] font-medium bg-[#38475F]/80 text-[#B8C9DD] px-2.5 py-1 rounded-md border border-[#38475F]"
                  >
                    <Tag className="w-3 h-3 text-[#1F98DC]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => setShowDocReader(true)}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-[#1F98DC] hover:bg-[#63A0D9] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Full 12-15 Page Report</span>
              </button>

              <button
                onClick={() => {
                  const fullDocStr = JSON.stringify(doc, null, 2);
                  navigator.clipboard.writeText(fullDocStr);
                  setCopiedSection("All Documentation JSON");
                  setTimeout(() => setCopiedSection(null), 2000);
                }}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#38475F] hover:bg-[#38475F]/80 text-[#B8C9DD] hover:text-white text-xs font-semibold rounded-xl border border-[#38475F] transition-colors cursor-pointer"
              >
                {copiedSection === "All Documentation JSON" ? <Check className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSection === "All Documentation JSON" ? "Copied All!" : "Copy Full Doc JSON"}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Two-Column Layout (Doc Sections + Embedded AI Chatbot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Mobile View Selector */}
        <div className="flex items-center gap-2 p-1 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl mb-6 lg:hidden">
          <button
            onClick={() => setActiveTab("doc")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === "doc" ? "bg-[#2A374E] text-white shadow-xs" : "text-[#6A7788]"
            }`}
          >
            Project Documentation
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === "chat" ? "bg-[#1F98DC] text-white shadow-xs" : "text-[#6A7788]"
            }`}
          >
            AI Assistant Chat
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Documentation Sections */}
          <div className={`lg:col-span-7 xl:col-span-8 space-y-6 ${activeTab === "doc" ? "block" : "hidden lg:block"}`}>
            
            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5 text-xs text-[#12171F] font-medium">
                <Info className="w-4 h-4 text-[#1F98DC] shrink-0" />
                <span>Tip: Click section headings to open full chapter reader mode. Use <b>[ Copy ]</b> for fast clipboard copying.</span>
              </div>
            </div>

            {/* SECTION 1: Project Overview */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Project Overview")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">01.</span>
                  <span>Project Overview</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Project Overview")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Project Overview", doc.overview)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Project Overview" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#12171F] leading-relaxed whitespace-pre-line">
                {doc.overview}
              </p>
            </div>

            {/* SECTION 2: Problem Statement */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Problem Statement")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">02.</span>
                  <span>Problem Statement</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Problem Statement")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Problem Statement", doc.problemStatement)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Problem Statement" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>
              <div className="p-4 bg-[#F1F2F5] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#12171F] leading-relaxed whitespace-pre-line">
                {doc.problemStatement}
              </div>
            </div>

            {/* SECTION 3: Objective */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Objective")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">03.</span>
                  <span>Objective & Goals</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Objective")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Objective", doc.objective)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Objective" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#12171F] leading-relaxed whitespace-pre-line">
                {doc.objective}
              </p>
            </div>

            {/* SECTION 4: Existing System */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Existing System")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">04.</span>
                  <span>Existing System</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Existing System")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Existing System", doc.existingSystem)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Existing System" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#12171F] leading-relaxed whitespace-pre-line">
                {doc.existingSystem}
              </p>
            </div>

            {/* SECTION 5: Proposed System */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Proposed System")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">05.</span>
                  <span>Proposed System</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Proposed System")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Proposed System", doc.proposedSystem)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Proposed System" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#12171F] leading-relaxed whitespace-pre-line">
                {doc.proposedSystem}
              </p>
            </div>

            {/* SECTION 6: Technologies Used */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Technologies Used")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">06.</span>
                  <span>Technologies Used</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Technologies Used")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Technologies Used", JSON.stringify(doc.technologiesUsed, null, 2))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Technologies Used" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-[#F1F2F5] rounded-xl border border-[#E5E7EB]">
                  <span className="font-bold text-xs uppercase text-[#6A7788] block mb-1.5">Frontend Layer</span>
                  <div className="flex flex-wrap gap-1">
                    {doc.technologiesUsed.frontend.map((item, idx) => (
                      <span key={idx} className="text-xs bg-[#FFFFFF] border border-[#E5E7EB] px-2 py-0.5 rounded text-[#12171F] font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-[#F1F2F5] rounded-xl border border-[#E5E7EB]">
                  <span className="font-bold text-xs uppercase text-[#6A7788] block mb-1.5">Backend & Services</span>
                  <div className="flex flex-wrap gap-1">
                    {doc.technologiesUsed.backend.map((item, idx) => (
                      <span key={idx} className="text-xs bg-[#FFFFFF] border border-[#E5E7EB] px-2 py-0.5 rounded text-[#12171F] font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-[#F1F2F5] rounded-xl border border-[#E5E7EB]">
                  <span className="font-bold text-xs uppercase text-[#6A7788] block mb-1.5">AI Models & SDKs</span>
                  <div className="flex flex-wrap gap-1">
                    {doc.technologiesUsed.aiServices.map((item, idx) => (
                      <span key={idx} className="text-xs bg-[#FFFFFF] border border-[#E5E7EB] px-2 py-0.5 rounded text-[#1F98DC] font-semibold">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-[#F1F2F5] rounded-xl border border-[#E5E7EB]">
                  <span className="font-bold text-xs uppercase text-[#6A7788] block mb-1.5">Database & Infrastructure</span>
                  <div className="flex flex-wrap gap-1">
                    {doc.technologiesUsed.database.map((item, idx) => (
                      <span key={idx} className="text-xs bg-[#FFFFFF] border border-[#E5E7EB] px-2 py-0.5 rounded text-[#12171F] font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 7: Architecture */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Architecture")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">07.</span>
                  <span>System Architecture</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Architecture")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Architecture", `${doc.architecture}\n\n${doc.architectureDiagramDesc}`)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Architecture" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#12171F] leading-relaxed mb-4">
                {doc.architecture}
              </p>

              <div className="p-4 bg-[#2A374E] text-[#B8C9DD] rounded-xl font-mono text-xs border border-[#38475F] leading-relaxed">
                <span className="text-[#1F98DC] font-bold block mb-1 uppercase text-[10px] tracking-wider">Visual Architecture Workflow</span>
                {doc.architectureDiagramDesc}
              </div>
            </div>

            {/* SECTION 8: Workflow */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Workflow")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">08.</span>
                  <span>Workflow Pipeline</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Workflow")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Workflow", doc.workflow)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Workflow" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#12171F] leading-relaxed whitespace-pre-line mb-4">
                {doc.workflow}
              </p>

              {doc.workflowSteps && (
                <div className="space-y-2 mt-4">
                  {doc.workflowSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-[#F1F2F5] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#12171F]">
                      <span className="w-6 h-6 rounded-full bg-[#1F98DC] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION 9: Modules */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Modules")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">09.</span>
                  <span>Functional Modules</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Modules")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Modules", doc.modules.map(m => `${m.name}: ${m.description}`).join("\n\n"))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Modules" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doc.modules.map((m) => (
                  <div key={m.id} className="p-4 bg-[#F1F2F5] border border-[#E5E7EB] rounded-xl">
                    <h4 className="font-bold text-[#12171F] text-xs mb-1">{m.name}</h4>
                    <p className="text-xs text-[#6A7788] leading-relaxed mb-3">{m.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {m.keyFunctions.map((fn, i) => (
                        <span key={i} className="text-[10px] bg-[#FFFFFF] border border-[#E5E7EB] text-[#12171F] px-2 py-0.5 rounded">
                          • {fn}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 10: Features */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Features")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">10.</span>
                  <span>Features & Core Capabilities</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Features")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Features", doc.features.join("\n"))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Features" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {doc.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 bg-[#F1F2F5] border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#12171F]">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SECTION 11: Advantages */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Advantages")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">11.</span>
                  <span>Advantages</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Advantages")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Advantages", doc.advantages.join("\n"))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Advantages" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {doc.advantages.map((adv, i) => (
                  <div key={i} className="p-3 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl text-xs text-[#12171F] font-medium">
                    ✓ {adv}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 12: Limitations */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Limitations")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">12.</span>
                  <span>Limitations</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Limitations")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Limitations", doc.limitations.join("\n"))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Limitations" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {doc.limitations.map((lim, i) => (
                  <div key={i} className="p-3 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl text-xs text-[#12171F] font-medium flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>{lim}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 13: Future Scope */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Future Scope")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">13.</span>
                  <span>Future Scope</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Future Scope")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Future Scope", doc.futureScope.join("\n"))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Future Scope" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {doc.futureScope.map((fs, i) => (
                  <div key={i} className="p-3 bg-[#1F98DC]/10 border border-[#1F98DC]/30 rounded-xl text-xs text-[#12171F] font-medium flex items-start gap-2">
                    <Rocket className="w-4 h-4 text-[#1F98DC] shrink-0 mt-0.5" />
                    <span>{fs}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 14: Conclusion */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Conclusion")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">14.</span>
                  <span>Conclusion</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Conclusion")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Conclusion", doc.conclusion)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Conclusion" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#12171F] leading-relaxed whitespace-pre-line">
                {doc.conclusion}
              </p>
            </div>

            {/* SECTION 15: System Requirements */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 shadow-xs group hover:border-[#63A0D9] transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <button
                  onClick={() => openDocSectionReader("Hardware & Software Requirements")}
                  className="text-lg font-bold text-[#12171F] group-hover:text-[#1F98DC] transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-[#1F98DC] font-extrabold text-sm font-mono">15.</span>
                  <span>Hardware & Software Requirements</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6A7788] group-hover:text-[#1F98DC] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Requirements")}
                    className="text-[11px] font-semibold text-[#1F98DC] hover:bg-[#F1F2F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Requirements", JSON.stringify(doc.systemRequirements, null, 2))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#12171F] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    {copiedSection === "Requirements" ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#6A7788]" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-[#F1F2F5] rounded-xl border border-[#E5E7EB]">
                  <span className="font-bold text-xs uppercase text-[#6A7788] block mb-2">Hardware Specifications</span>
                  <ul className="list-disc pl-5 text-xs text-[#12171F] space-y-1">
                    {doc.systemRequirements?.hardware.map((h, i) => <li key={i}>{h}</li>) || <li>Standard Server CPU & RAM</li>}
                  </ul>
                </div>
                <div className="p-3.5 bg-[#F1F2F5] rounded-xl border border-[#E5E7EB]">
                  <span className="font-bold text-xs uppercase text-[#6A7788] block mb-2">Software Prerequisites</span>
                  <ul className="list-disc pl-5 text-xs text-[#12171F] space-y-1">
                    {doc.systemRequirements?.software.map((s, i) => <li key={i}>{s}</li>) || <li>Node.js 18+, React 19</li>}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Project-Aware AI Chatbot */}
          <div className={`lg:col-span-5 xl:col-span-4 sticky top-20 ${activeTab === "chat" ? "block" : "hidden lg:block"}`}>
            <AiChatbot
              project={project}
              selectedSection={selectedChatSection}
            />
          </div>

        </div>

      </div>

      {/* Doc Reader Modal */}
      {showDocReader && (
        <DocReaderModal
          project={project}
          onClose={() => setShowDocReader(false)}
        />
      )}

    </div>
  );
};
