import React, { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  Mic, 
  Waves, 
  CheckSquare, 
  Zap, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  FileText, 
  ChevronRight, 
  ArrowRight, 
  User, 
  Users, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Globe, 
  Activity, 
  Menu, 
  X, 
  Radio, 
  Database, 
  Key,
  Shield,
  ArrowUpRight,
  TrendingUp
} from "lucide-react";

interface LandingPageProps {
  onSignInClick: () => void;
  onCreateAccountClick: () => void;
  onEnterWorkspace: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSignInClick,
  onCreateAccountClick,
  onEnterWorkspace,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "actions" | "search">("actions");
  
  // Interactive Checkboxes state for Section A proof of concept
  const [tasks, setTasks] = useState([
    {
      id: "t1",
      title: "Implement Token Authentication Middleware",
      assignee: "Sarah M.",
      due: "Tomorrow",
      completed: true,
      priority: "Urgent",
    },
    {
      id: "t2",
      title: "Optimize Vector Search Embeddings Index",
      assignee: "David K.",
      due: "In 2 Days",
      completed: true,
      priority: "High",
    },
    {
      id: "t3",
      title: "Deploy Multi-Region Failover Cluster",
      assignee: "Alex R.",
      due: "Friday",
      completed: false,
      priority: "Medium",
    },
  ]);

  // Semantic query interactive search simulator
  const [searchQuery, setSearchQuery] = useState("JWT token validation");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([
    'Timestamp 14:20 — "Backend API endpoints now strictly enforce JWT token validation..."',
    'Timestamp 28:45 — "Configured RS256 signing keys for token authentication middleware..."',
  ]);

  const handleTaskToggle = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleSimulateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResults([
        `Timestamp 14:20 — Exact match found for "${searchQuery}" in Sprint Architecture Review.`,
        `Timestamp 31:05 — Semantic context reference: upgraded query execution pipeline.`,
      ]);
    }, 400);
  };

  // Canvas Interactive Neural Mesh Network Background
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate Neural Mesh Nodes
    const nodeCount = Math.floor(Math.min(width, height) / 14);
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }[] = [];

    const colors = ["#F59E0B", "#8B5CF6", "#6366F1", "#3B82F6"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Nodes and Vector Connecting Lines
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Move nodes
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Bounce on boundaries
        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        // Mouse attraction
        const dxMouse = mouseX - nodeA.x;
        const dyMouse = mouseY - nodeA.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          nodeA.x += (dxMouse / distMouse) * 0.3;
          nodeA.y += (dyMouse / distMouse) * 0.3;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeA.color;
        ctx.shadowColor = nodeA.color;
        ctx.shadowBlur = 8;
        ctx.fill();

        // Connect nearby nodes with vector lines
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0F17] text-white font-sans overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Dynamic Animated Neural Mesh Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-60"
      />

      {/* Subtle Background Radial Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[40%] right-[-10%] w-[600px] h-[600px] bg-amber-900/15 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-indigo-900/20 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* ==================== 1. FIXED GLASSMORPHIC HEADER & NAV ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0B0F17]/75 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Badge & Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-[#0B0F17] rounded-[11px] flex items-center justify-between p-2">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  AI Project Hub
                </span>
                <span className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                  Enterprise
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                AI Meeting Intelligence Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-amber-400 transition-colors">
              Features
            </a>
            <a href="#architecture" className="hover:text-purple-400 transition-colors">
              Architecture
            </a>
            <a href="#security" className="hover:text-indigo-400 transition-colors">
              Security
            </a>
            <a href="#poc" className="hover:text-amber-400 transition-colors">
              Live Workspace Proof
            </a>
            <a href="#docs" className="hover:text-slate-100 transition-colors">
              Documentation
            </a>
          </nav>

          {/* Right Side Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onSignInClick}
              className="px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase border border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm"
            >
              SIGN IN
            </button>
            <button
              onClick={onCreateAccountClick}
              className="px-5 py-2 rounded-lg text-xs font-bold tracking-wider uppercase bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-md hover:shadow-lg hover:shadow-white/10 active:scale-95"
            >
              CREATE ACCOUNT
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-[#0B0F17]/95 backdrop-blur-xl border-b border-white/10 flex flex-col gap-4">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-300 hover:text-amber-400 font-medium"
            >
              Features
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-300 hover:text-purple-400 font-medium"
            >
              Architecture
            </a>
            <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-300 hover:text-indigo-400 font-medium"
            >
              Security
            </a>
            <a
              href="#poc"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-300 hover:text-amber-400 font-medium"
            >
              Live Workspace Proof
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignInClick();
                }}
                className="w-full py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase border border-white/20 text-white bg-white/5 text-center"
              >
                SIGN IN
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCreateAccountClick();
                }}
                className="w-full py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase bg-white text-slate-950 font-bold text-center"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ==================== 2. HERO SECTION ==================== */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 text-center flex flex-col items-center">
        
        {/* Eyebrow Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-lg shadow-amber-500/5 mb-8 animate-pulse">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          <span>⚡ AI-POWERED MEETING ASSISTANT & KNOWLEDGE GRAPH WORKSPACE</span>
        </div>

        {/* H1 Headline */}
        <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
          Turn Everyday Meetings into{" "}
          <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Actionable Intelligence
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl text-base sm:text-xl text-slate-400 font-normal leading-relaxed mb-10">
          Record, transcribe, summarize, organize, and semantically search all enterprise meetings with real-time AI breakdown and automatic task extraction.
        </p>

        {/* Primary Call-to-Action Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={onCreateAccountClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-slate-950 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onEnterWorkspace}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2 group"
          >
            <span>Workspace Login</span>
            <ArrowUpRight className="w-5 h-5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Floating Node Badge Chips */}
        <div className="w-full max-w-4xl flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-300">
          <div className="px-5 py-2.5 rounded-full bg-white/5 border border-amber-500/30 backdrop-blur-md flex items-center gap-2.5 shadow-lg shadow-amber-500/5 hover:border-amber-400/60 transition-all hover:scale-105">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>⚡ INSTANT ACTION ITEM EXTRACTION</span>
          </div>
          <div className="px-5 py-2.5 rounded-full bg-white/5 border border-purple-500/30 backdrop-blur-md flex items-center gap-2.5 shadow-lg shadow-purple-500/5 hover:border-purple-400/60 transition-all hover:scale-105">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>🟣 VECTOR SEMANTIC SEARCH</span>
          </div>
          <div className="px-5 py-2.5 rounded-full bg-white/5 border border-indigo-500/30 backdrop-blur-md flex items-center gap-2.5 shadow-lg shadow-indigo-500/5 hover:border-indigo-400/60 transition-all hover:scale-105">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>🔒 ENTERPRISE ZERO-KNOWLEDGE RETENTION</span>
          </div>
        </div>

      </section>

      {/* ==================== 3. CORE FEATURES SECTION ==================== */}
      <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-3">
            ARCHITECTURAL CAPABILITIES
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineered for Modern Enterprise Engineering Teams
          </p>
          <p className="text-slate-400 text-base sm:text-lg">
            High-speed transcription, zero-friction task pipelines, and lightning sub-10ms vector search.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="relative group p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.06] hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div>
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Mic className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span>Smart Transcription & Diarization</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Convert live audio streams or uploaded recordings into structured, speaker-diarized transcriptions with multi-language precision.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <span>Whisper-Large Neural Engine</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.06] hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div>
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <CheckSquare className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span>AI Action Item Extraction</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Automatically parse decisions, actionable tasks, assigned owners, due dates, and sentiment indices into structured execution pipelines.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
              <span>Gemini 2.5 Pro Pipeline</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.06] hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div>
              <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span>Vector Semantic Search</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Query natural language across historical transcript stores to retrieve precise timestamps, direct quotes, and contextual answers in milliseconds.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <span>Sub-10ms Embedding Index</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </section>

      {/* ==================== 4. INTERACTIVE PRODUCT PROOF OF CONCEPT ==================== */}
      <section id="poc" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Proof of Concept</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Live Workspace Interface Simulation
          </h2>
          <p className="text-slate-400 text-base">
            Test the real-time meeting dashboard below. Try toggling completed tasks or executing vector queries.
          </p>
        </div>

        {/* Dashboard Card Container */}
        <div className="rounded-2xl bg-[#121824] border border-white/15 backdrop-blur-xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
          
          {/* Header Bar */}
          <div className="px-6 py-5 bg-white/[0.04] border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Sprint Alignment & Architecture Review
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>4 participants</span>
                <span>•</span>
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>42 mins</span>
                <span>•</span>
                <span className="text-amber-400 font-semibold">Recorded Today</span>
              </p>
            </div>

            {/* Sentiment Index Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
              <TrendingUp className="w-4 h-4" />
              <span>Sentiment Index: +88% Positive</span>
            </div>
          </div>

          {/* Interactive Mode Switcher Tabs */}
          <div className="px-6 pt-4 border-b border-white/10 bg-white/[0.02] flex gap-4 text-xs font-bold uppercase tracking-wider text-slate-400 overflow-x-auto">
            <button
              onClick={() => setActiveTab("actions")}
              className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "actions"
                  ? "border-amber-400 text-amber-400 font-extrabold"
                  : "border-transparent hover:text-white"
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Extracted Action Items ({tasks.filter(t => t.completed).length}/{tasks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("summary")}
              className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "summary"
                  ? "border-purple-400 text-purple-400 font-extrabold"
                  : "border-transparent hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Executive Summary</span>
            </button>

            <button
              onClick={() => setActiveTab("search")}
              className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "search"
                  ? "border-indigo-400 text-indigo-400 font-extrabold"
                  : "border-transparent hover:text-white"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Vector Search</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Section A — Extracted Action Items */}
            {activeTab === "actions" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Extracted Action Items Pipeline
                  </span>
                  <span className="text-xs text-amber-400 font-medium">
                    Click items to toggle completion status
                  </span>
                </div>

                <div className="space-y-3">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskToggle(task.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        task.completed
                          ? "bg-amber-500/5 border-amber-500/30 text-slate-200"
                          : "bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button className="mt-0.5 text-amber-400 focus:outline-none">
                          <CheckCircle2
                            className={`w-5 h-5 transition-transform ${
                              task.completed ? "fill-amber-500/20 text-amber-400 scale-110" : "text-slate-600"
                            }`}
                          />
                        </button>
                        <div>
                          <p className={`font-semibold text-sm ${task.completed ? "line-through text-slate-400" : "text-white"}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                            <span>Assigned to: <strong className="text-slate-200">{task.assignee}</strong></span>
                            <span>•</span>
                            <span>Due: <strong className="text-amber-400">{task.due}</strong></span>
                          </div>
                        </div>
                      </div>

                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                        task.priority === "Urgent" 
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/30" 
                          : task.priority === "High"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-slate-500/10 text-slate-300 border-slate-500/30"
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section B — Executive Summary Container */}
            {activeTab === "summary" && (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs font-semibold flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
                  <span>
                    Executive Summary automatically generated by Gemini 2.5 Pro reasoning engine.
                  </span>
                </div>

                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 leading-relaxed text-slate-300 text-sm sm:text-base">
                  <p>
                    The engineering team finalized Q3 core architecture specifications. Backend API endpoints now strictly enforce JWT token validation. Vector database indexes for meeting transcript retrieval were upgraded for sub-10ms query execution.
                  </p>
                </div>
              </div>
            )}

            {/* Section C — Vector Semantic Search Simulator */}
            {activeTab === "search" && (
              <div className="space-y-4">
                <form onSubmit={handleSimulateSearch} className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Ask questions across transcript history..."
                      className="w-full bg-white/[0.05] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    {isSearching ? "Searching..." : "Vector Query"}
                  </button>
                </form>

                <div className="space-y-2 pt-2">
                  {searchResults.map((res, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 flex items-start gap-3">
                      <Radio className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>Pinecone Vector Store • Connected</span>
            </span>
            <button
              onClick={onEnterWorkspace}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
            >
              <span>Open Full Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </section>

      {/* ==================== 5. ARCHITECTURE & SECURITY Showcase ==================== */}
      <section id="architecture" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-white/10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wider uppercase mb-4">
              <Cpu className="w-4 h-4" />
              <span>System Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              Low-Latency Vector Pipeline & Gemini AI Engine
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-6">
              Built on a distributed cloud architecture handling real-time audio streams, tokenized diarization, and immediate vector embeddings with sub-10ms query retrieval.
            </p>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                <Radio className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">1. WebRTC & WebSocket Stream Ingestion</strong>
                  <span>Continuous live audio chunking with dynamic noise suppression.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">2. Gemini 2.5 Pro Reasoning</strong>
                  <span>Deep contextual summarization, task owner matching, and sentiment tracking.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                <Database className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">3. High-Density Vector Store</strong>
                  <span>Instant semantic retrieval across thousands of historical meeting hours.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Box */}
          <div id="security" className="p-8 rounded-2xl bg-gradient-to-br from-[#121824] to-[#0B0F17] border border-white/15 backdrop-blur-xl shadow-2xl relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Enterprise Grade Security & Compliance
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your meeting audio and transcript data are protected by strict enterprise security protocols and zero-knowledge retention guarantees.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-300">
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>AES-256 Encryption</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>SOC2 Type II Certified</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>JWT Token Auth</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero AI Model Training</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ==================== 6. FOOTER CTA & BRAND ==================== */}
      <footer id="docs" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-white/10 text-slate-400 text-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-base mb-2">
              <Shield className="w-5 h-5 text-amber-400" />
              <span>AI Project Hub — Meeting Assistant</span>
            </div>
            <p className="max-w-md text-slate-400">
              Transforming enterprise meetings into actionable structured intelligence with Gemini AI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-semibold">
            <button onClick={onSignInClick} className="hover:text-white transition-colors">
              Sign In
            </button>
            <button onClick={onCreateAccountClick} className="hover:text-white transition-colors">
              Create Account
            </button>
            <button onClick={onEnterWorkspace} className="hover:text-amber-400 transition-colors">
              Workspace Login
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <span>© 2026 AI Project Hub. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Documentation API</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
