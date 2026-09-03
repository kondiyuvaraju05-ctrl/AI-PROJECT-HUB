import React, { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  Mic, 
  Zap, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  FileText, 
  ChevronRight, 
  ArrowRight, 
  CheckSquare,
  CheckCircle2, 
  Menu, 
  X, 
  Radio, 
  Database, 
  Shield,
  ArrowUpRight
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

    // Generate Neural Mesh Nodes in Sky Blue, Ice Slate, and Soft Blue
    const nodeCount = Math.floor(Math.min(width, height) / 14);
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }[] = [];

    const colors = ["#1F98DC", "#63A0D9", "#B8C9DD", "#FFFFFF"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
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
        if (distMouse < 140) {
          nodeA.x += (dxMouse / distMouse) * 0.25;
          nodeA.y += (dyMouse / distMouse) * 0.25;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeA.color;
        ctx.shadowColor = nodeA.color;
        ctx.shadowBlur = 6;
        ctx.fill();

        // Connect nearby nodes with vector lines
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            const alpha = (1 - dist / 125) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(99, 160, 217, ${alpha})`;
            ctx.lineWidth = 0.75;
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
    <div className="relative min-h-screen bg-[#F1F2F5] text-[#12171F] font-sans selection:bg-[#1F98DC] selection:text-white">
      
      {/* ==================== 1. FIXED HEADER & NAV ==================== */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#2A374E] text-white border-b border-[#38475F] shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Badge & Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F98DC] flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">
                  AI Project Hub
                </span>
                <span className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#1F98DC]/20 text-[#B8C9DD] border border-[#63A0D9]/30 uppercase">
                  Enterprise
                </span>
              </div>
              <span className="text-[11px] text-[#B8C9DD] font-medium tracking-wide">
                AI Meeting Intelligence Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#B8C9DD]">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#architecture" className="hover:text-white transition-colors">
              Architecture
            </a>
            <a href="#security" className="hover:text-white transition-colors">
              Security
            </a>
            <a href="#docs" className="hover:text-white transition-colors">
              Documentation
            </a>
          </nav>

          {/* Right Side Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onSignInClick}
              className="px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase border border-[#63A0D9]/30 text-white bg-[#38475F] hover:bg-[#38475F]/80 transition-all cursor-pointer"
            >
              SIGN IN
            </button>
            <button
              onClick={onCreateAccountClick}
              className="px-5 py-2 rounded-lg text-xs font-bold tracking-wider uppercase bg-[#1F98DC] text-white hover:bg-[#63A0D9] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              CREATE ACCOUNT
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#38475F] border border-[#63A0D9]/30 text-[#B8C9DD] hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-[#2A374E] border-b border-[#38475F] flex flex-col gap-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#B8C9DD] hover:text-white font-medium text-xs"
            >
              Features
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#B8C9DD] hover:text-white font-medium text-xs"
            >
              Architecture
            </a>
            <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#B8C9DD] hover:text-white font-medium text-xs"
            >
              Security
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignInClick();
                }}
                className="w-full py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase border border-[#63A0D9]/30 text-white bg-[#38475F] text-center"
              >
                SIGN IN
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCreateAccountClick();
                }}
                className="w-full py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase bg-[#1F98DC] text-white font-bold text-center"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ==================== 2. HERO SECTION ==================== */}
      <section className="relative bg-[#2A374E] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#38475F] overflow-hidden text-center flex flex-col items-center">
        
        {/* Dynamic Animated Neural Mesh Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0 opacity-40"
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Eyebrow Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F98DC]/20 border border-[#63A0D9]/40 text-[#B8C9DD] text-xs sm:text-sm font-semibold tracking-wide shadow-md mb-8">
            <Zap className="w-4 h-4 text-[#1F98DC]" />
            <span>⚡ AI-POWERED MEETING ASSISTANT & KNOWLEDGE GRAPH WORKSPACE</span>
          </div>

          {/* H1 Headline */}
          <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            Turn Everyday Meetings into{" "}
            <span className="bg-gradient-to-r from-white via-[#B8C9DD] to-[#1F98DC] bg-clip-text text-transparent">
              Actionable Intelligence
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl text-base sm:text-xl text-[#B8C9DD] font-normal leading-relaxed mb-10">
            Record, transcribe, summarize, organize, and semantically search all enterprise meetings with real-time AI breakdown and automatic task extraction.
          </p>

          {/* Primary Call-to-Action Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
            <button
              onClick={onCreateAccountClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#1F98DC] text-white shadow-xl shadow-[#1F98DC]/25 hover:bg-[#63A0D9] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={onEnterWorkspace}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#38475F] border border-[#63A0D9]/30 text-white hover:bg-[#38475F]/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Workspace Login</span>
              <ArrowUpRight className="w-4 h-4 text-[#1F98DC]" />
            </button>
          </div>

          {/* Floating Node Badge Chips */}
          <div className="w-full max-w-4xl flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#B8C9DD]">
            <div className="px-5 py-2.5 rounded-full bg-[#38475F]/80 border border-[#63A0D9]/30 flex items-center gap-2.5 shadow-md hover:border-[#1F98DC] transition-all hover:scale-105">
              <Zap className="w-4 h-4 text-[#F59E0B]" />
              <span>⚡ INSTANT ACTION ITEM EXTRACTION</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-[#38475F]/80 border border-[#63A0D9]/30 flex items-center gap-2.5 shadow-md hover:border-[#1F98DC] transition-all hover:scale-105">
              <Sparkles className="w-4 h-4 text-[#1F98DC]" />
              <span>🔹 VECTOR SEMANTIC SEARCH</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-[#38475F]/80 border border-[#63A0D9]/30 flex items-center gap-2.5 shadow-md hover:border-[#1F98DC] transition-all hover:scale-105">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span>🔒 ENTERPRISE ZERO-KNOWLEDGE RETENTION</span>
            </div>
          </div>

        </div>

      </section>

      {/* ==================== 3. CORE FEATURES SECTION ==================== */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#1F98DC] uppercase mb-3">
            ARCHITECTURAL CAPABILITIES
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-[#12171F] tracking-tight mb-4">
            Engineered for Modern Enterprise Engineering Teams
          </p>
          <p className="text-[#6A7788] text-base sm:text-lg">
            High-speed transcription, zero-friction task pipelines, and lightning sub-10ms vector search.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#63A0D9] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#2A374E] text-[#1F98DC] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mic className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#12171F] mb-3 flex items-center gap-2">
                <span>Smart Transcription & Diarization</span>
              </h3>
              <p className="text-[#6A7788] text-sm leading-relaxed mb-6">
                Convert live audio streams or uploaded recordings into structured, speaker-diarized transcriptions with multi-language precision.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-2 text-xs font-bold text-[#1F98DC] uppercase tracking-wider">
              <span>Whisper-Large Neural Engine</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#63A0D9] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#2A374E] text-[#1F98DC] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckSquare className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#12171F] mb-3 flex items-center gap-2">
                <span>AI Action Item Extraction</span>
              </h3>
              <p className="text-[#6A7788] text-sm leading-relaxed mb-6">
                Automatically parse decisions, actionable tasks, assigned owners, due dates, and sentiment indices into structured execution pipelines.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-2 text-xs font-bold text-[#1F98DC] uppercase tracking-wider">
              <span>Gemini 2.5 Pro Pipeline</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#63A0D9] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#2A374E] text-[#1F98DC] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#12171F] mb-3 flex items-center gap-2">
                <span>Vector Semantic Search</span>
              </h3>
              <p className="text-[#6A7788] text-sm leading-relaxed mb-6">
                Query natural language across historical transcript stores to retrieve precise timestamps, direct quotes, and contextual answers in milliseconds.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-2 text-xs font-bold text-[#1F98DC] uppercase tracking-wider">
              <span>Sub-10ms Embedding Index</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </section>

      {/* ==================== 4. ARCHITECTURE & SECURITY SECTION ==================== */}
      <section id="architecture" className="bg-[#2A374E] text-white py-20 px-4 sm:px-6 lg:px-8 border-y border-[#38475F]">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F98DC]/20 border border-[#63A0D9]/40 text-[#B8C9DD] text-xs font-bold tracking-wider uppercase mb-4">
                <Cpu className="w-4 h-4 text-[#1F98DC]" />
                <span>System Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
                Low-Latency Vector Pipeline & Gemini AI Engine
              </h2>
              <p className="text-[#B8C9DD] text-base leading-relaxed mb-6">
                Built on a distributed cloud architecture handling real-time audio streams, tokenized diarization, and immediate vector embeddings with sub-10ms query retrieval.
              </p>

              <div className="space-y-4 text-sm text-[#B8C9DD]">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#38475F]/60 border border-[#38475F]">
                  <Radio className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">1. WebRTC & WebSocket Stream Ingestion</strong>
                    <span>Continuous live audio chunking with dynamic noise suppression.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#38475F]/60 border border-[#38475F]">
                  <Sparkles className="w-5 h-5 text-[#1F98DC] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">2. Gemini 2.5 Pro Reasoning</strong>
                    <span>Deep contextual summarization, task owner matching, and sentiment tracking.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#38475F]/60 border border-[#38475F]">
                  <Database className="w-5 h-5 text-[#63A0D9] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">3. High-Density Vector Store</strong>
                    <span>Instant semantic retrieval across thousands of historical meeting hours.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Box */}
            <div id="security" className="p-8 rounded-2xl bg-[#38475F] border border-[#63A0D9]/30 shadow-2xl relative">
              <div className="w-12 h-12 rounded-xl bg-[#22C55E]/20 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Enterprise Grade Security & Compliance
              </h3>
              <p className="text-[#B8C9DD] text-sm leading-relaxed mb-6">
                Your meeting audio and transcript data are protected by strict enterprise security protocols and zero-knowledge retention guarantees.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-white">
                <div className="p-3 rounded-lg bg-[#2A374E] border border-[#38475F] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>AES-256 Encryption</span>
                </div>
                <div className="p-3 rounded-lg bg-[#2A374E] border border-[#38475F] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>SOC2 Type II Certified</span>
                </div>
                <div className="p-3 rounded-lg bg-[#2A374E] border border-[#38475F] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>JWT Token Auth</span>
                </div>
                <div className="p-3 rounded-lg bg-[#2A374E] border border-[#38475F] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>Zero AI Model Training</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== 5. FOOTER CTA & BRAND ==================== */}
      <footer id="docs" className="bg-[#2A374E] text-[#B8C9DD] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#38475F] text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-base mb-2">
              <Shield className="w-5 h-5 text-[#1F98DC]" />
              <span>AI Project Hub — Meeting Assistant</span>
            </div>
            <p className="max-w-md text-[#B8C9DD]">
              Transforming enterprise meetings into actionable structured intelligence with Gemini AI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-semibold">
            <button onClick={onSignInClick} className="hover:text-white transition-colors cursor-pointer">
              Sign In
            </button>
            <button onClick={onCreateAccountClick} className="hover:text-white transition-colors cursor-pointer">
              Create Account
            </button>
            <button onClick={onEnterWorkspace} className="text-[#1F98DC] hover:text-[#63A0D9] transition-colors cursor-pointer">
              Workspace Login
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#38475F] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#B8C9DD]/80">
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
