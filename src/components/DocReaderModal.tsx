import React, { useState } from "react";
import jsPDF from "jspdf";
import { Project } from "../types";
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  ListOrdered,
  GraduationCap,
  Sparkles,
  Download,
  FileDown,
  Loader2
} from "lucide-react";

interface DocReaderModalProps {
  project: Project;
  onClose: () => void;
  initialSection?: string;
}

export const DocReaderModal: React.FC<DocReaderModalProps> = ({
  project,
  onClose,
  initialSection,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedDocsFormat, setCopiedDocsFormat] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  
  // Gemini 2.5 Pro In-built Side Headings AI Expansion State
  const [isExpanding, setIsExpanding] = useState(false);
  const [expandedContentMap, setExpandedContentMap] = useState<Record<string, string>>({});
  const [showAiExpander, setShowAiExpander] = useState(false);
  
  // Full Document Creation with Gemini 2.5 Pro ⭐
  const [isGeneratingFullDoc, setIsGeneratingFullDoc] = useState(false);
  const [fullGeneratedDoc, setFullGeneratedDoc] = useState<string | null>(null);

  const doc = project.documentation;

  const handleGenerateFullDocWithGeminiPro = async () => {
    setIsGeneratingFullDoc(true);
    try {
      const res = await fetch("/api/generate-full-doc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project }),
      });
      const data = await res.json();
      if (res.ok && data.fullDocumentation) {
        setFullGeneratedDoc(data.fullDocumentation);
      }
    } catch (err) {
      console.error("Failed to generate full doc with Gemini 2.5 Pro:", err);
    } finally {
      setIsGeneratingFullDoc(false);
    }
  };

  const handleDownloadWordDoc = (customDocText?: string) => {
    setShowDownloadMenu(false);
    
    // Format markdown text into styled Word HTML structure
    let formattedHtml = "";
    const rawText = customDocText || fullGeneratedDoc;

    if (rawText) {
      // Simple markdown to HTML conversion for Word export
      formattedHtml = rawText
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^- (.*$)/gim, '<li>$1</li>');
      formattedHtml = `<p>${formattedHtml}</p>`;
    } else {
      formattedHtml = `
        <h1>${project.name}</h1>
        <h3>Google Gemini 2.5 Pro ⭐ Generated Documentation Report</h3>
        <p><strong>Domain Focus:</strong> ${project.domainId.toUpperCase()} | <strong>Author:</strong> ${project.author}</p><hr/>
        <h2>1. Project Overview & Executive Summary</h2><p>${doc.overview}</p>
        <h2>2. Problem Statement & Research Gap</h2><p>${doc.problemStatement}</p>
        <h2>3. Project Objectives</h2><p>${doc.objective}</p>
        <h2>4. Existing vs Proposed System</h2>
        <h3>Existing System</h3><p>${doc.existingSystem}</p>
        <h3>Proposed System</h3><p>${doc.proposedSystem}</p>
        <h2>5. Technology Stack & Frameworks</h2>
        <ul>
          <li><strong>Frontend:</strong> ${doc.technologiesUsed.frontend.join(", ")}</li>
          <li><strong>Backend:</strong> ${doc.technologiesUsed.backend.join(", ")}</li>
          <li><strong>AI Services:</strong> ${doc.technologiesUsed.aiServices.join(", ")}</li>
          <li><strong>Database:</strong> ${doc.technologiesUsed.database.join(", ")}</li>
        </ul>
        <h2>6. System Architecture & Component Interaction</h2><p>${doc.architecture}</p>
        <h2>7. System Workflow</h2><p>${doc.workflow}</p>
        <h2>8. Functional Modules Breakdown</h2>
        ${doc.modules.map(m => `<h3>${m.name}</h3><p>${m.description}</p><p><strong>Key Functions:</strong> ${m.keyFunctions.join(", ")}</p>`).join("")}
        <h2>9. Conclusion & Final Summary</h2><p>${doc.conclusion}</p>
      `;
    }

    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>" + project.name + " Documentation</title>" +
      "<style>" +
      "body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; color: #1e293b; line-height: 1.6; }" +
      "h1 { color: #1e3a8a; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; font-size: 24pt; }" +
      "h2 { color: #1e40af; margin-top: 24px; font-size: 16pt; border-left: 4px solid #3b82f6; padding-left: 10px; }" +
      "h3 { color: #1f2937; margin-top: 16px; font-size: 13pt; }" +
      "p { font-size: 11pt; text-align: justify; margin-bottom: 12px; }" +
      "ul { margin-bottom: 12px; }" +
      "li { margin-bottom: 4px; font-size: 11pt; }" +
      "blockquote { background: #f8fafc; border-left: 4px solid #8b5cf6; margin: 16px 0; padding: 12px 16px; font-style: italic; }" +
      "</style></head><body>";

    const footer = "</body></html>";
    const sourceHTML = header + formattedHtml + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `${project.name.replace(/[^a-z0-9]/gi, '_')}_Documentation.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const handleExpandWithGeminiPro = async (chapterTitle: string, currentText: string) => {
    setIsExpanding(true);
    setShowAiExpander(true);
    try {
      const res = await fetch("/api/expand-doc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: {
            name: project.name,
            overview: doc.overview,
            architecture: doc.architecture,
            technologies: doc.technologiesUsed,
          },
          sectionTitle: chapterTitle,
          currentContent: currentText,
          action: "expand_with_subheadings"
        }),
      });

      const data = await res.json();
      if (res.ok && data.expandedText) {
        setExpandedContentMap((prev) => ({
          ...prev,
          [chapterTitle]: data.expandedText,
        }));
      }
    } catch (err) {
      console.error("Gemini 2.5 Pro Expansion Error:", err);
    } finally {
      setIsExpanding(false);
    }
  };

  const handleCopyGoogleDocsFormat = () => {
    const googleDocsFormattedText = `# ${project.name}\n\n` +
      `> **Google Gemini 2.5 Pro ⭐ Documentation Report**\n` +
      `> Generated for Google Docs & Technical Publication\n\n` +
      `## 1. Project Overview & Executive Summary\n${doc.overview}\n\n` +
      `## 2. Problem Statement & Research Gap\n${doc.problemStatement}\n\n` +
      `## 3. Project Objectives & Key Deliverables\n${doc.objective}\n\n` +
      `## 4. Existing System vs Proposed Architecture\n### Existing System\n${doc.existingSystem}\n\n### Proposed System\n${doc.proposedSystem}\n\n` +
      `## 5. Technology Stack & Frameworks\n` +
      `- **Frontend**: ${doc.technologiesUsed.frontend.join(", ")}\n` +
      `- **Backend**: ${doc.technologiesUsed.backend.join(", ")}\n` +
      `- **AI Services**: ${doc.technologiesUsed.aiServices.join(", ")}\n` +
      `- **Database**: ${doc.technologiesUsed.database.join(", ")}\n\n` +
      `## 6. System Architecture & Workflow\n${doc.architecture}\n\nWorkflow Steps:\n${doc.workflow}\n\n` +
      `## 7. Functional Modules\n${doc.modules.map(m => `### ${m.name}\n${m.description}\nFunctions: ${m.keyFunctions.join(", ")}`).join("\n\n")}\n\n` +
      `## 8. Conclusion & Future Scope\n${doc.conclusion}`;

    navigator.clipboard.writeText(googleDocsFormattedText);
    setCopiedDocsFormat(true);
    setTimeout(() => setCopiedDocsFormat(false), 2000);
  };

  const chapters = [
    { id: "title", title: "Cover Page & Academic Certificate" },
    { id: "overview", title: "1. Project Overview & Executive Summary" },
    { id: "problem", title: "2. Problem Statement & Research Gap" },
    { id: "objective", title: "3. Project Objectives & Design Goals" },
    { id: "existing", title: "4. Existing System & Comparative Analysis" },
    { id: "proposed", title: "5. Proposed System Architecture" },
    { id: "tech", title: "6. Technologies Used & Tech Stack" },
    { id: "architecture", title: "7. System Architecture & Component Diagram" },
    { id: "workflow", title: "8. Detailed System Workflow & Data Flow" },
    { id: "modules", title: "9. Functional Modules Breakdown" },
    { id: "features", title: "10. Key Features & Operational Capabilities" },
    { id: "advantages", title: "11. System Advantages & Business Benefits" },
    { id: "limitations", title: "12. Known Limitations & Constraints" },
    { id: "futurescope", title: "13. Future Scope & Research Roadmaps" },
    { id: "conclusion", title: "14. Conclusion & Final Summary" },
    { id: "requirements", title: "15. Hardware & Software Requirements" },
  ];

  const getChapterData = (idx: number) => {
    const chap = chapters[idx];
    let lines: string[] = [];

    if (idx === 0) {
      lines = [
        `PROJECT REPORT: ${project.name}`,
        `AUTHOR / RESEARCHER: ${project.author}`,
        `DOMAIN FOCUS: ${project.domainId.toUpperCase()}`,
        `ACADEMIC YEAR: 2026`,
        ``,
        `ABSTRACT:`,
        doc.overview
      ];
    } else if (chap.id === "overview") {
      lines = [doc.overview];
    } else if (chap.id === "problem") {
      lines = [doc.problemStatement];
    } else if (chap.id === "objective") {
      lines = [doc.objective];
    } else if (chap.id === "existing") {
      lines = [doc.existingSystem];
    } else if (chap.id === "proposed") {
      lines = [doc.proposedSystem];
    } else if (chap.id === "tech") {
      lines = [
        `Frontend Stack: ${doc.technologiesUsed.frontend.join(", ")}`,
        `Backend & Microservices: ${doc.technologiesUsed.backend.join(", ")}`,
        `AI Engine & LLM: ${doc.technologiesUsed.aiServices.join(", ")}`,
        `Database & Auth: ${doc.technologiesUsed.database.join(", ")}`,
        `Deployment: ${doc.technologiesUsed.deployment.join(", ")}`
      ];
    } else if (chap.id === "architecture") {
      lines = [
        doc.architecture,
        ``,
        `Architecture Flow Description:`,
        doc.architectureDiagramDesc
      ];
    } else if (chap.id === "workflow") {
      lines = [doc.workflow];
      if (doc.workflowSteps) {
        lines.push(``);
        lines.push(`Workflow Steps:`);
        doc.workflowSteps.forEach((s, i) => lines.push(`Step ${i + 1}: ${s}`));
      }
    } else if (chap.id === "modules") {
      doc.modules.forEach(m => {
        lines.push(`Module: ${m.name}`);
        lines.push(m.description);
        lines.push(`Key Functions: ${m.keyFunctions.join(", ")}`);
        lines.push(``);
      });
    } else if (chap.id === "features") {
      doc.features.forEach(f => lines.push(`• ${f}`));
    } else if (chap.id === "advantages") {
      doc.advantages.forEach(a => lines.push(`[+] ${a}`));
    } else if (chap.id === "limitations") {
      doc.limitations.forEach(l => lines.push(`[!] ${l}`));
    } else if (chap.id === "futurescope") {
      doc.futureScope.forEach(fs => lines.push(`[>] ${fs}`));
    } else if (chap.id === "conclusion") {
      lines = [doc.conclusion];
    } else if (chap.id === "requirements") {
      lines = [
        `Hardware Requirements:`,
        ...(doc.systemRequirements?.hardware.map(h => `• ${h}`) || ["• Standard CPU / RAM"]),
        ``,
        `Software Requirements:`,
        ...(doc.systemRequirements?.software.map(s => `• ${s}`) || ["• Node.js, Express, React"])
      ];
    }

    return { title: chap.title, lines };
  };

  const handleDownloadSectionPdf = (chapterIdx: number = activeChapterIndex) => {
    setIsGeneratingPdf(true);
    setShowDownloadMenu(false);
    try {
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      const maxLineWidth = pageWidth - margin * 2;

      const { title, lines } = getChapterData(chapterIdx);

      // Header Banner
      pdf.setFillColor(15, 23, 42); // slate-900
      pdf.rect(0, 0, pageWidth, 55, "F");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(255, 255, 255);
      pdf.text(project.name, margin, 28);

      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(96, 165, 250); // blue-400
      pdf.text(`Academic Project Documentation • Domain: ${project.domainId.toUpperCase()}`, margin, 42);

      let y = 80;

      // Section Title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(15, 23, 42);
      pdf.text(title, margin, y);
      y += 16;

      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(1);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 20;

      // Body text
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9.5);
      pdf.setTextColor(51, 65, 85);

      lines.forEach((line) => {
        if (!line) {
          y += 6;
          return;
        }
        const wrapped = pdf.splitTextToSize(line, maxLineWidth);
        if (y + wrapped.length * 13 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(wrapped, margin, y);
        y += wrapped.length * 13 + 5;
      });

      // Page numbers
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(148, 163, 184);
        pdf.text(`AI Project Hub • ${project.name} • Page ${i} of ${totalPages}`, margin, pageHeight - 20);
      }

      const cleanFilename = `${project.name.replace(/[^a-z0-9]/gi, '_')}_${title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      pdf.save(cleanFilename);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadFullReportPdf = () => {
    setIsGeneratingPdf(true);
    setShowDownloadMenu(false);
    try {
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      const maxLineWidth = pageWidth - margin * 2;

      chapters.forEach((chap, idx) => {
        if (idx > 0) {
          pdf.addPage();
        }

        // Header Banner on each chapter page
        pdf.setFillColor(15, 23, 42); // slate-900
        pdf.rect(0, 0, pageWidth, 55, "F");

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.setTextColor(255, 255, 255);
        pdf.text(project.name, margin, 28);

        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(96, 165, 250);
        pdf.text(`Academic Documentation Report • Author: ${project.author}`, margin, 42);

        let y = 80;

        const { title, lines } = getChapterData(idx);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(13);
        pdf.setTextColor(15, 23, 42);
        pdf.text(title, margin, y);
        y += 16;

        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(1);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 20;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9.5);
        pdf.setTextColor(51, 65, 85);

        lines.forEach((line) => {
          if (!line) {
            y += 6;
            return;
          }
          const wrapped = pdf.splitTextToSize(line, maxLineWidth);
          if (y + wrapped.length * 13 > pageHeight - margin) {
            pdf.addPage();
            // Repeat slim header banner on continuation page
            pdf.setFillColor(15, 23, 42);
            pdf.rect(0, 0, pageWidth, 35, "F");
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(9);
            pdf.setTextColor(255, 255, 255);
            pdf.text(`${project.name} - ${title} (Continued)`, margin, 22);

            y = 50;
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(9.5);
            pdf.setTextColor(51, 65, 85);
          }
          pdf.text(wrapped, margin, y);
          y += wrapped.length * 13 + 5;
        });
      });

      // Page numbering
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(148, 163, 184);
        pdf.text(
          `AI Project Hub • Formal Academic Documentation • Page ${i} of ${totalPages}`,
          margin,
          pageHeight - 20
        );
      }

      const cleanFilename = `${project.name.replace(/[^a-z0-9]/gi, '_')}_Full_Project_Report.pdf`;
      pdf.save(cleanFilename);
    } catch (err) {
      console.error("Full PDF generation failed:", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleCopySection = (title: string, text: string) => {
    navigator.clipboard.writeText(`## ${title}\n\n${text}`);
    setCopiedSection(title);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleCopyAllMarkdown = () => {
    const fullMarkdown = `
# ${project.name}
**Domain:** ${project.domainId.toUpperCase()}
**Author / Institution:** ${project.author}
**Document Type:** Formal College Project Documentation (15 Pages)

## 1. Project Overview
${doc.overview}

## 2. Problem Statement
${doc.problemStatement}

## 3. Objective
${doc.objective}

## 4. Existing System
${doc.existingSystem}

## 5. Proposed System
${doc.proposedSystem}

## 6. Technologies Used
- Frontend: ${doc.technologiesUsed.frontend.join(", ")}
- Backend: ${doc.technologiesUsed.backend.join(", ")}
- AI Services: ${doc.technologiesUsed.aiServices.join(", ")}
- Database: ${doc.technologiesUsed.database.join(", ")}
- Authentication: ${doc.technologiesUsed.authentication.join(", ")}
- Deployment: ${doc.technologiesUsed.deployment.join(", ")}

## 7. Architecture
${doc.architecture}
Diagram Description: ${doc.architectureDiagramDesc}

## 8. Workflow
${doc.workflow}

## 9. Functional Modules
${doc.modules.map(m => `### ${m.name}\n${m.description}\nFunctions: ${m.keyFunctions.join(", ")}`).join("\n\n")}

## 10. Key Features
${doc.features.map(f => `- ${f}`).join("\n")}

## 11. System Advantages
${doc.advantages.map(a => `- ${a}`).join("\n")}

## 12. System Limitations
${doc.limitations.map(l => `- ${l}`).join("\n")}

## 13. Future Scope
${doc.futureScope.map(fs => `- ${fs}`).join("\n")}

## 14. Conclusion
${doc.conclusion}

## 15. Hardware & Software Requirements
Hardware: ${doc.systemRequirements?.hardware.join(", ") || "Standard CPU/RAM"}
Software: ${doc.systemRequirements?.software.join(", ") || "Node.js, React, Express"}
`.trim();

    navigator.clipboard.writeText(fullMarkdown);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      <div className="bg-white w-full max-w-6xl h-[94vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Modal Top Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest block">
                Academic & College Project Report
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-white truncate max-w-md sm:max-w-xl">
                {project.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            <button
              onClick={handleCopyGoogleDocsFormat}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
              title="Copy formatted with side headings for Google Docs"
            >
              {copiedDocsFormat ? <Check className="w-3.5 h-3.5 text-purple-200" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
              <span className="hidden sm:inline">{copiedDocsFormat ? "Docs Format Copied!" : "Copy for Google Docs"}</span>
            </button>

            <button
              onClick={handleCopyAllMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedAll ? "Copied All!" : "Copy Markdown"}</span>
            </button>

            {/* Download Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                disabled={isGeneratingPdf || isGeneratingFullDoc}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isGeneratingPdf || isGeneratingFullDoc ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>Export / Download</span>
              </button>

              {showDownloadMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-1.5 space-y-1">
                  <button
                    onClick={() => handleDownloadSectionPdf(activeChapterIndex)}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Download Current Section (PDF)</span>
                    <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                  <button
                    onClick={handleDownloadFullReportPdf}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Download Full PDF Report (15 Sections)</span>
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                  </button>
                  <div className="my-1 border-t border-slate-800" />
                  <button
                    onClick={() => handleDownloadWordDoc()}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Download Word Document (.doc)</span>
                    <FileText className="w-3.5 h-3.5 text-purple-400" />
                  </button>
                  <button
                    onClick={handleGenerateFullDocWithGeminiPro}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-900/40 hover:text-purple-200 rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Gemini 2.5 Pro ⭐ Full Doc
                    </span>
                    <Download className="w-3.5 h-3.5 text-purple-300" />
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Body Grid (Sidebar Nav + Document Page View) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Chapter Navigation Sidebar */}
          <div className="w-80 bg-slate-50 border-r border-slate-200 p-4 overflow-y-auto hidden md:block shrink-0">
            {/* Gemini 2.5 Pro Feature Highlight Box */}
            <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 mb-1">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Google Gemini 2.5 Pro ⭐</span>
              </div>
              <p className="text-[11px] text-purple-700 leading-snug">
                Optimized for long technical documents. Use side heading tools to expand or generate deep technical explanations.
              </p>
            </div>

            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 px-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ListOrdered className="w-3.5 h-3.5" />
                Table of Contents
              </span>
              <span className="text-[10px] text-slate-400 font-normal">15 Sections</span>
            </h3>
            
            <nav className="space-y-1">
              {chapters.map((chap, idx) => (
                <button
                  key={chap.id}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    activeChapterIndex === idx
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-200/60"
                  }`}
                >
                  <span className="truncate">{chap.title}</span>
                  {activeChapterIndex === idx && <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-1" />}
                </button>
              ))}
            </nav>
          </div>

          {/* Paper View Container */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-100 font-serif text-slate-900 printable-doc">
            
            {/* Gemini 2.5 Pro Full Document Synthesizer Banner */}
            <div className="max-w-3xl mx-auto mb-6 bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-900 text-white p-5 rounded-2xl shadow-md border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-purple-600/30 rounded-xl border border-purple-400/30 text-amber-300 shrink-0">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-purple-200 uppercase tracking-wider">
                      Google Gemini 2.5 Pro ⭐
                    </span>
                    <span className="bg-purple-500/30 text-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30">
                      Exhaustive Doc Generator
                    </span>
                  </div>
                  <p className="text-xs text-purple-100/90 mt-1">
                    Synthesize full publication-grade report with in-built side headings. Ready for Google Docs & Word (.doc) export.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                {fullGeneratedDoc ? (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleDownloadWordDoc(fullGeneratedDoc)}
                      className="flex-1 sm:flex-none px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Export .doc</span>
                    </button>
                    <button
                      onClick={() => setFullGeneratedDoc(null)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition-all cursor-pointer"
                    >
                      Chapters View
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleGenerateFullDocWithGeminiPro}
                    disabled={isGeneratingFullDoc}
                    className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isGeneratingFullDoc ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                        <span>Synthesizing Doc...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Generate Full Doc with Gemini 2.5 Pro ⭐</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 shadow-lg rounded-xl border border-slate-200/80 min-h-[900px] font-sans">
              
              {/* GEMINI 2.5 PRO GENERATED FULL DOCUMENT VIEW */}
              {fullGeneratedDoc ? (
                <div className="space-y-6">
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-extrabold text-purple-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        Gemini 2.5 Pro ⭐ Full Synthesized Project Document
                      </h2>
                      <p className="text-xs text-purple-700 mt-0.5">
                        Exhaustive multi-section report with structured in-built side headings.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadWordDoc(fullGeneratedDoc)}
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Download Word (.doc)</span>
                      </button>
                      <button
                        onClick={handleCopyGoogleDocsFormat}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Copy className="w-3.5 h-3.5 text-amber-300" />
                        <span>Copy for Google Docs</span>
                      </button>
                    </div>
                  </div>

                  <div className="prose prose-purple max-w-none text-sm text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                    {fullGeneratedDoc}
                  </div>
                </div>
              ) : (
                <>
                  {/* COVER PAGE (Chapter 0) */}
              {activeChapterIndex === 0 && (
                <div className="text-center py-12 border-b-2 border-slate-900 mb-10">
                  <div className="w-16 h-16 bg-blue-50 text-blue-700 border border-blue-200 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xs">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">
                    A Project Report On
                  </span>
                  <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
                    {project.name}
                  </h1>
                  <p className="text-sm font-medium text-slate-600 max-w-lg mx-auto mb-8">
                    Submitted in partial fulfillment for the requirement of Bachelor / Master of Technology Degree in Engineering & Computer Science
                  </p>
                  
                  <div className="border-t border-b border-slate-200 py-6 my-6 grid grid-cols-2 gap-4 text-xs font-medium text-slate-700">
                    <div className="text-left pl-8">
                      <span className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Author / Researcher</span>
                      <span className="font-bold text-slate-900 block">{project.author}</span>
                      <span>Department of Computer Science</span>
                    </div>
                    <div className="text-right pr-8">
                      <span className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Domain Focus</span>
                      <span className="font-bold text-blue-700 block">{project.domainId.toUpperCase()}</span>
                      <span>Academic Year 2026</span>
                    </div>
                  </div>

                  <div className="mt-10 bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs text-slate-600 relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-800">Abstract</span>
                      <button
                        onClick={() => handleDownloadSectionPdf(0)}
                        disabled={isGeneratingPdf}
                        className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-md transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Download Cover & Abstract PDF</span>
                      </button>
                    </div>
                    <p>{doc.overview}</p>
                  </div>
                </div>
              )}

              {/* CHAPTER CONTENT RENDERING */}
              {activeChapterIndex > 0 && (
                <div className="space-y-8">
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                    <h2 className="text-xl font-extrabold text-slate-900">
                      {chapters[activeChapterIndex].title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => {
                          const chap = chapters[activeChapterIndex];
                          let currentText = "";
                          if (chap.id === "overview") currentText = doc.overview;
                          else if (chap.id === "problem") currentText = doc.problemStatement;
                          else if (chap.id === "objective") currentText = doc.objective;
                          else if (chap.id === "existing") currentText = doc.existingSystem;
                          else if (chap.id === "proposed") currentText = doc.proposedSystem;
                          else if (chap.id === "architecture") currentText = doc.architecture;
                          else if (chap.id === "workflow") currentText = doc.workflow;
                          else currentText = JSON.stringify(chap);

                          handleExpandWithGeminiPro(chap.title, currentText);
                        }}
                        disabled={isExpanding}
                        className="flex items-center gap-1.5 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                        title="Use Gemini 2.5 Pro to expand this section with structured subheadings"
                      >
                        {isExpanding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                        <span>Expand with Gemini 2.5 Pro ⭐</span>
                      </button>

                      <button
                        onClick={() => handleDownloadSectionPdf(activeChapterIndex)}
                        disabled={isGeneratingPdf}
                        className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <FileDown className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Download Section PDF</span>
                      </button>

                      <button
                        onClick={() => {
                          let textToCopy = "";
                          const chapId = chapters[activeChapterIndex].id;
                          if (chapId === "overview") textToCopy = doc.overview;
                          if (chapId === "problem") textToCopy = doc.problemStatement;
                          if (chapId === "objective") textToCopy = doc.objective;
                          if (chapId === "existing") textToCopy = doc.existingSystem;
                          if (chapId === "proposed") textToCopy = doc.proposedSystem;
                          if (chapId === "architecture") textToCopy = `${doc.architecture}\n\nDiagram Flow: ${doc.architectureDiagramDesc}`;
                          if (chapId === "workflow") textToCopy = doc.workflow;
                          if (chapId === "conclusion") textToCopy = doc.conclusion;
                          handleCopySection(chapters[activeChapterIndex].title, textToCopy || "Section Content");
                        }}
                        className="flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors cursor-pointer"
                      >
                        {copiedSection === chapters[activeChapterIndex].title ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                        )}
                        <span>Copy Section</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Content depending on chapter */}
                  <div className="text-sm text-slate-800 leading-relaxed space-y-4">
                    {chapters[activeChapterIndex].id === "overview" && (
                      <p className="whitespace-pre-line">{doc.overview}</p>
                    )}

                    {chapters[activeChapterIndex].id === "problem" && (
                      <div className="p-4 bg-red-50/60 border border-red-200 rounded-xl text-slate-800">
                        <p className="whitespace-pre-line font-serif leading-relaxed">{doc.problemStatement}</p>
                      </div>
                    )}

                    {chapters[activeChapterIndex].id === "objective" && (
                      <p className="whitespace-pre-line">{doc.objective}</p>
                    )}

                    {chapters[activeChapterIndex].id === "existing" && (
                      <p className="whitespace-pre-line">{doc.existingSystem}</p>
                    )}

                    {chapters[activeChapterIndex].id === "proposed" && (
                      <p className="whitespace-pre-line">{doc.proposedSystem}</p>
                    )}

                    {chapters[activeChapterIndex].id === "tech" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                          <span className="font-bold text-xs uppercase text-slate-500 block mb-2">Frontend Stack</span>
                          <ul className="list-disc pl-5 text-xs space-y-1 text-slate-700">
                            {doc.technologiesUsed.frontend.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                          <span className="font-bold text-xs uppercase text-slate-500 block mb-2">Backend & Microservices</span>
                          <ul className="list-disc pl-5 text-xs space-y-1 text-slate-700">
                            {doc.technologiesUsed.backend.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                          <span className="font-bold text-xs uppercase text-slate-500 block mb-2">AI Engine & LLM</span>
                          <ul className="list-disc pl-5 text-xs space-y-1 text-slate-700">
                            {doc.technologiesUsed.aiServices.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                          <span className="font-bold text-xs uppercase text-slate-500 block mb-2">Database & Auth</span>
                          <ul className="list-disc pl-5 text-xs space-y-1 text-slate-700">
                            {doc.technologiesUsed.database.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                      </div>
                    )}

                    {chapters[activeChapterIndex].id === "architecture" && (
                      <div>
                        <p className="mb-4">{doc.architecture}</p>
                        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl font-mono text-xs text-indigo-900">
                          <span className="font-bold block mb-1 uppercase tracking-wider text-indigo-700">Architecture Diagram Representation</span>
                          {doc.architectureDiagramDesc}
                        </div>
                      </div>
                    )}

                    {chapters[activeChapterIndex].id === "workflow" && (
                      <div>
                        <p className="mb-4 whitespace-pre-line">{doc.workflow}</p>
                        {doc.workflowSteps && (
                          <div className="space-y-2 mt-4">
                            {doc.workflowSteps.map((step, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shrink-0">
                                  {idx + 1}
                                </span>
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {chapters[activeChapterIndex].id === "modules" && (
                      <div className="space-y-4">
                        {doc.modules.map((mod) => (
                          <div key={mod.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <h4 className="font-bold text-slate-900 text-sm mb-1">{mod.name}</h4>
                            <p className="text-xs text-slate-600 mb-2">{mod.description}</p>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Key Functions:</span>
                            <div className="flex flex-wrap gap-1">
                              {mod.keyFunctions.map((fn, i) => (
                                <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700">
                                  • {fn}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {chapters[activeChapterIndex].id === "features" && (
                      <ul className="space-y-2">
                        {doc.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {chapters[activeChapterIndex].id === "advantages" && (
                      <ul className="space-y-2">
                        {doc.advantages.map((adv, i) => (
                          <li key={i} className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs text-emerald-900 font-medium">
                            ✓ {adv}
                          </li>
                        ))}
                      </ul>
                    )}

                    {chapters[activeChapterIndex].id === "limitations" && (
                      <ul className="space-y-2">
                        {doc.limitations.map((lim, i) => (
                          <li key={i} className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg text-xs text-amber-900 font-medium">
                            ⚠ {lim}
                          </li>
                        ))}
                      </ul>
                    )}

                    {chapters[activeChapterIndex].id === "futurescope" && (
                      <ul className="space-y-2">
                        {doc.futureScope.map((fs, i) => (
                          <li key={i} className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg text-xs text-blue-900 font-medium">
                            🚀 {fs}
                          </li>
                        ))}
                      </ul>
                    )}

                    {chapters[activeChapterIndex].id === "conclusion" && (
                      <p className="whitespace-pre-line leading-relaxed">{doc.conclusion}</p>
                    )}

                    {chapters[activeChapterIndex].id === "requirements" && (
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                          <span className="font-bold text-xs uppercase text-slate-600 block mb-2">Hardware Specifications</span>
                          <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
                            {doc.systemRequirements?.hardware.map((h, i) => <li key={i}>{h}</li>) || <li>Standard Server CPU & RAM</li>}
                          </ul>
                        </div>
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                          <span className="font-bold text-xs uppercase text-slate-600 block mb-2">Software Environment</span>
                          <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
                            {doc.systemRequirements?.software.map((s, i) => <li key={i}>{s}</li>) || <li>Node.js, Express, React 19</li>}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* AI Expanded Content Box (Gemini 2.5 Pro with side headings) */}
                    {expandedContentMap[chapters[activeChapterIndex].title] && (
                      <div className="mt-8 p-6 bg-purple-50/70 border-2 border-purple-200 rounded-2xl shadow-sm text-slate-800 space-y-3">
                        <div className="flex items-center justify-between border-b border-purple-200 pb-3">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-purple-600" />
                            <span className="font-extrabold text-sm text-purple-900 uppercase tracking-wide">
                              Gemini 2.5 Pro ⭐ In-Built Side Headings Deep Expansion
                            </span>
                          </div>
                          <button
                            onClick={() => handleCopySection(`Expanded - ${chapters[activeChapterIndex].title}`, expandedContentMap[chapters[activeChapterIndex].title])}
                            className="flex items-center gap-1 px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Expanded Section</span>
                          </button>
                        </div>
                        <div className="prose prose-purple max-w-none text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                          {expandedContentMap[chapters[activeChapterIndex].title]}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}
              </>
              )}

            </div>

            {/* Pagination controls at bottom */}
            <div className="max-w-3xl mx-auto mt-6 flex items-center justify-between text-xs">
              <button
                onClick={() => setActiveChapterIndex(Math.max(0, activeChapterIndex - 1))}
                disabled={activeChapterIndex === 0}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-slate-700 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </button>

              <span className="font-bold text-slate-500">
                Page {activeChapterIndex + 1} of {chapters.length}
              </span>

              <button
                onClick={() => setActiveChapterIndex(Math.min(chapters.length - 1, activeChapterIndex + 1))}
                disabled={activeChapterIndex === chapters.length - 1}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-40 transition-colors"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
