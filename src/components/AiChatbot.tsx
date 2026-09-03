import React, { useState, useRef, useEffect } from "react";
import { Project, ChatMessage } from "../types";
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  Copy, 
  Check, 
  RefreshCw, 
  MessageSquare,
  HelpCircle,
  Lightbulb,
  Maximize2,
  Minimize2
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface AiChatbotProps {
  project: Project;
  isOpen?: boolean;
  onClose?: () => void;
  selectedSection?: string;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({
  project,
  isOpen = true,
  onClose,
  selectedSection,
}) => {
  const [selectedModel, setSelectedModel] = useState<"gemini-2.5-pro" | "gemini-3.6-flash">("gemini-2.5-pro");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: `Hello! I am your AI Project Assistant for **${project.name}**, powered by **Google Gemini 2.5 Pro ⭐**.\n\nI specialize in long-form technical documentation, deep technical explanations, and structuring content with clear in-built side headings. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle section context change if triggered externally
  useEffect(() => {
    if (selectedSection) {
      handleQuickPrompt(`Provide a comprehensive explanation of the "${selectedSection}" section with structured in-built side headings.`);
    }
  }, [selectedSection]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: {
            name: project.name,
            domain: project.domainId,
            overview: project.documentation.overview,
            problemStatement: project.documentation.problemStatement,
            objective: project.documentation.objective,
            technologies: project.documentation.technologiesUsed,
            architecture: project.documentation.architecture,
            workflow: project.documentation.workflow,
            modules: project.documentation.modules,
            advantages: project.documentation.advantages,
            limitations: project.documentation.limitations,
            futureScope: project.documentation.futureScope,
          },
          query: textToSend,
          history: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
          selectedSection: selectedSection || null,
          model: selectedModel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text || "I'm sorry, I couldn't generate an answer right now.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: `⚠️ **AI Service Note:** I am currently using offline cached project rules to assist you. ${project.name} is built with ${project.documentation.technologiesUsed.frontend.join(", ")} and handles ${project.documentation.overview.slice(0, 120)}...`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: `Chat reset! I am ready to answer any question about **${project.name}**. What section would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div
      className={`bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-300 font-sans ${
        isExpanded ? "h-[800px]" : "h-[620px]"
      }`}
    >
      {/* Header - `#2A374E` */}
      <div className="bg-[#2A374E] text-white p-4 flex items-center justify-between border-b border-[#38475F]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1F98DC] flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white tracking-tight">
                Project AI Assistant
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#22C55E]/20 text-[#22C55E] px-2 py-0.5 rounded-full border border-[#22C55E]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                Live Context
              </span>
            </div>
            <span className="text-[11px] text-[#B8C9DD] font-medium truncate max-w-[200px] sm:max-w-[280px] block">
              Aware of: {project.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            title="Reset Chat"
            className="p-1.5 text-[#B8C9DD] hover:text-white hover:bg-[#38475F] rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Minimize" : "Maximize"}
            className="p-1.5 text-[#B8C9DD] hover:text-white hover:bg-[#38475F] rounded-lg transition-colors hidden sm:block cursor-pointer"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              title="Close Chat"
              className="p-1.5 text-[#B8C9DD] hover:text-white hover:bg-[#38475F] rounded-lg transition-colors ml-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* AI Model Selector Sub-Bar */}
      <div className="bg-[#38475F] text-[#B8C9DD] px-4 py-2 text-xs flex items-center justify-between border-b border-[#2A374E]">
        <div className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#1F98DC]" />
          <span>Model Engine:</span>
        </div>
        <div className="flex items-center gap-1 bg-[#2A374E] p-0.5 rounded-lg border border-[#38475F]">
          <button
            onClick={() => setSelectedModel("gemini-2.5-pro")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              selectedModel === "gemini-2.5-pro"
                ? "bg-[#1F98DC] text-white shadow-xs"
                : "text-[#B8C9DD] hover:text-white"
            }`}
          >
            Gemini 2.5 Pro ⭐
          </button>
          <button
            onClick={() => setSelectedModel("gemini-3.6-flash")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              selectedModel === "gemini-3.6-flash"
                ? "bg-[#1F98DC] text-white shadow-xs"
                : "text-[#B8C9DD] hover:text-white"
            }`}
          >
            Gemini 3.6 Flash
          </button>
        </div>
      </div>

      {/* Preset Quick Question Chips */}
      <div className="bg-[#F1F2F5] border-b border-[#E5E7EB] p-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-bold text-[#6A7788] uppercase tracking-wider shrink-0 px-1">
          Ask AI:
        </span>
        <button
          onClick={() => handleQuickPrompt("Generate a detailed technical expansion with in-built side headings for this project.")}
          className="px-2.5 py-1 text-[11px] font-bold bg-[#1F98DC]/15 border border-[#1F98DC]/30 text-[#1F98DC] hover:bg-[#1F98DC]/25 rounded-lg whitespace-nowrap shadow-2xs transition-colors shrink-0 cursor-pointer flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-[#1F98DC]" />
          <span>Expand with Side Headings ⭐</span>
        </button>
        <button
          onClick={() => handleQuickPrompt("Format this project documentation into publication-ready Google Docs structure with subheadings.")}
          className="px-2.5 py-1 text-[11px] font-semibold bg-[#FFFFFF] border border-[#E5E7EB] text-[#12171F] hover:border-[#63A0D9] hover:text-[#1F98DC] rounded-lg whitespace-nowrap shadow-2xs transition-colors shrink-0 cursor-pointer"
        >
          Format for Google Docs
        </button>
        <button
          onClick={() => handleQuickPrompt("Explain the Architecture of this project in simple English.")}
          className="px-2.5 py-1 text-[11px] font-semibold bg-[#FFFFFF] border border-[#E5E7EB] text-[#12171F] hover:border-[#63A0D9] hover:text-[#1F98DC] rounded-lg whitespace-nowrap shadow-2xs transition-colors shrink-0 cursor-pointer"
        >
          Explain Architecture
        </button>
        <button
          onClick={() => handleQuickPrompt("Explain the Workflow & step-by-step pipeline of this project.")}
          className="px-2.5 py-1 text-[11px] font-semibold bg-[#FFFFFF] border border-[#E5E7EB] text-[#12171F] hover:border-[#63A0D9] hover:text-[#1F98DC] rounded-lg whitespace-nowrap shadow-2xs transition-colors shrink-0 cursor-pointer"
        >
          Explain Workflow
        </button>
        <button
          onClick={() => handleQuickPrompt("Explain the Tech Stack used in this project and why they were chosen.")}
          className="px-2.5 py-1 text-[11px] font-semibold bg-[#FFFFFF] border border-[#E5E7EB] text-[#12171F] hover:border-[#63A0D9] hover:text-[#1F98DC] rounded-lg whitespace-nowrap shadow-2xs transition-colors shrink-0 cursor-pointer"
        >
          Explain Tech Stack
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F1F2F5]/60">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold text-[#6A7788]">
                {msg.sender === "user" ? "You" : "AI Assistant"}
              </span>
              <span className="text-[10px] text-[#6A7788]">{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-[88%] p-3.5 rounded-2xl text-xs relative group ${
                msg.sender === "user"
                  ? "bg-[#1F98DC] text-white rounded-br-xs shadow-xs"
                  : "bg-[#FFFFFF] border border-[#E5E7EB] text-[#12171F] rounded-bl-xs shadow-xs"
              }`}
            >
              {msg.sender === "bot" ? (
                <div className="markdown-body leading-relaxed">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              )}

              {/* Copy answer button for bot messages */}
              {msg.sender === "bot" && (
                <button
                  onClick={() => handleCopy(msg.id, msg.text)}
                  className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 bg-[#F1F2F5] hover:bg-[#E5E7EB] text-[#6A7788] rounded transition-opacity cursor-pointer"
                  title="Copy Answer"
                >
                  {copiedId === msg.id ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                </button>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-[#6A7788] bg-[#FFFFFF] p-3 rounded-2xl border border-[#E5E7EB] w-fit shadow-xs">
            <div className="w-4 h-4 border-2 border-[#1F98DC] border-t-transparent rounded-full animate-spin" />
            <span>Analyzing project documentation...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[#FFFFFF] border-t border-[#E5E7EB]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={`Ask anything about ${project.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-3.5 py-2 text-xs bg-[#F1F2F5] border border-[#E5E7EB] rounded-xl text-[#12171F] placeholder-[#6A7788] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] focus:bg-[#FFFFFF] transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2 bg-[#1F98DC] hover:bg-[#63A0D9] text-white rounded-xl disabled:opacity-40 transition-all cursor-pointer shadow-xs shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
