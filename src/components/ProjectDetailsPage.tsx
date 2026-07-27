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
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Top Banner & Title Bar */}
      <div className="bg-slate-900 text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          
          <button
            onClick={onBackToDomain}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Domain Projects</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-extrabold px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full uppercase tracking-wider">
                  Domain: {project.domainId.toUpperCase()}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-md">
                  {project.difficulty}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded-md uppercase">
                  {project.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
                {project.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {project.shortDescription}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[10px] font-medium bg-slate-800 text-slate-200 px-2.5 py-1 rounded-md border border-slate-700"
                  >
                    <Tag className="w-3 h-3 text-blue-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => setShowDocReader(true)}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02]"
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
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                {copiedSection === "All Documentation JSON" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSection === "All Documentation JSON" ? "Copied All!" : "Copy Full Doc JSON"}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Two-Column Layout (Doc Sections + Embedded AI Chatbot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Mobile View Selector */}
        <div className="flex items-center gap-2 p-1 bg-slate-200 rounded-xl mb-6 lg:hidden">
          <button
            onClick={() => setActiveTab("doc")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === "doc" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
            }`}
          >
            Project Documentation
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === "chat" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600"
            }`}
          >
            AI Assistant Chat
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Primary Column: Documentation Sections (8 Cols) */}
          <div className={`lg:col-span-7 xl:col-span-8 space-y-6 ${activeTab === "doc" ? "block" : "hidden lg:block"}`}>
            
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs text-blue-900 font-medium">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Tip: Every section heading is clickable to open full chapter reader mode. Use <b>[ Copy ]</b> to copy section text.</span>
              </div>
            </div>

            {/* SECTION 1: Project Overview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Project Overview")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">01.</span>
                  <span>Project Overview</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Project Overview")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Project Overview", doc.overview)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Project Overview" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {doc.overview}
              </p>
            </div>

            {/* SECTION 2: Problem Statement */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Problem Statement")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">02.</span>
                  <span>Problem Statement</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Problem Statement")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Problem Statement", doc.problemStatement)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Problem Statement" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>
              <div className="p-4 bg-red-50/50 border border-red-200/60 rounded-xl text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                {doc.problemStatement}
              </div>
            </div>

            {/* SECTION 3: Objective */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Objective")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">03.</span>
                  <span>Objective & Goals</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Objective")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Objective", doc.objective)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Objective" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {doc.objective}
              </p>
            </div>

            {/* SECTION 4: Existing System */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Existing System")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">04.</span>
                  <span>Existing System</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Existing System")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Existing System", doc.existingSystem)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Existing System" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {doc.existingSystem}
              </p>
            </div>

            {/* SECTION 5: Proposed System */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Proposed System")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">05.</span>
                  <span>Proposed System</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Proposed System")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Proposed System", doc.proposedSystem)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Proposed System" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {doc.proposedSystem}
              </p>
            </div>

            {/* SECTION 6: Technologies Used */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Technologies Used")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">06.</span>
                  <span>Technologies Used</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Technologies Used")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Technologies Used", JSON.stringify(doc.technologiesUsed, null, 2))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Technologies Used" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-xs uppercase text-slate-500 block mb-1">Frontend Layer</span>
                  <div className="flex flex-wrap gap-1">
                    {doc.technologiesUsed.frontend.map((item, idx) => (
                      <span key={idx} className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-800 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-xs uppercase text-slate-500 block mb-1">Backend & Services</span>
                  <div className="flex flex-wrap gap-1">
                    {doc.technologiesUsed.backend.map((item, idx) => (
                      <span key={idx} className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-800 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-xs uppercase text-slate-500 block mb-1">AI Models & SDKs</span>
                  <div className="flex flex-wrap gap-1">
                    {doc.technologiesUsed.aiServices.map((item, idx) => (
                      <span key={idx} className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded text-blue-700 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-xs uppercase text-slate-500 block mb-1">Database & Infra</span>
                  <div className="flex flex-wrap gap-1">
                    {doc.technologiesUsed.database.map((item, idx) => (
                      <span key={idx} className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-800 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 7: Architecture */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Architecture")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">07.</span>
                  <span>Architecture</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Architecture")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Architecture", `${doc.architecture}\n\n${doc.architectureDiagramDesc}`)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Architecture" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                {doc.architecture}
              </p>

              <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs border border-slate-800 leading-relaxed">
                <span className="text-blue-400 font-bold block mb-1 uppercase text-[10px] tracking-wider">Visual Diagram Sequence</span>
                {doc.architectureDiagramDesc}
              </div>
            </div>

            {/* SECTION 8: Workflow */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Workflow")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">08.</span>
                  <span>Workflow Pipeline</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Workflow")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Workflow", doc.workflow)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Workflow" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-4">
                {doc.workflow}
              </p>

              {doc.workflowSteps && (
                <div className="space-y-2 mt-4">
                  {doc.workflowSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION 9: Modules */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Modules")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">09.</span>
                  <span>Functional Modules</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Modules")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Modules", doc.modules.map(m => `${m.name}: ${m.description}`).join("\n\n"))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Modules" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doc.modules.map((m) => (
                  <div key={m.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <h4 className="font-bold text-slate-900 text-xs mb-1">{m.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">{m.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {m.keyFunctions.map((fn, i) => (
                        <span key={i} className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded">
                          • {fn}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 10: Features */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Features")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">10.</span>
                  <span>Features</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Features")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Features", doc.features.join("\n"))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Features" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {doc.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SECTION 11: Advantages */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Advantages")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">11.</span>
                  <span>Advantages</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Advantages")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Advantages", doc.advantages.join("\n"))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Advantages" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {doc.advantages.map((adv, i) => (
                  <div key={i} className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl text-xs text-emerald-950 font-medium">
                    ✓ {adv}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 12: Limitations */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Limitations")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">12.</span>
                  <span>Limitations</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Limitations")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Limitations", doc.limitations.join("\n"))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Limitations" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {doc.limitations.map((lim, i) => (
                  <div key={i} className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs text-amber-950 font-medium flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{lim}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 13: Future Scope */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Future Scope")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">13.</span>
                  <span>Future Scope</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Future Scope")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Future Scope", doc.futureScope.join("\n"))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Future Scope" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {doc.futureScope.map((fs, i) => (
                  <div key={i} className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl text-xs text-blue-950 font-medium flex items-start gap-2">
                    <Rocket className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{fs}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 14: Conclusion */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Conclusion")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">14.</span>
                  <span>Conclusion</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Conclusion")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Conclusion", doc.conclusion)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Conclusion" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {doc.conclusion}
              </p>
            </div>

            {/* SECTION 15: System Requirements */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <button
                  onClick={() => openDocSectionReader("Hardware & Software Requirements")}
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm font-mono">15.</span>
                  <span>Hardware & Software Requirements</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAskSectionInChat("Requirements")}
                    className="text-[11px] font-semibold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Ask AI
                  </button>
                  <button
                    onClick={() => handleCopySection("Requirements", JSON.stringify(doc.systemRequirements, null, 2))}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "Requirements" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>[ Copy ]</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-xs uppercase text-slate-500 block mb-2">Hardware Specifications</span>
                  <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
                    {doc.systemRequirements?.hardware.map((h, i) => <li key={i}>{h}</li>) || <li>Standard Server CPU & RAM</li>}
                  </ul>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-xs uppercase text-slate-500 block mb-2">Software Prerequisites</span>
                  <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
                    {doc.systemRequirements?.software.map((s, i) => <li key={i}>{s}</li>) || <li>Node.js 18+, React 19</li>}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Project-Aware AI Chatbot (4 Cols / 5 Cols) */}
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
