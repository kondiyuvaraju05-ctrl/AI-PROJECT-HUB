import React, { useState } from "react";
import { User } from "../types";
import { 
  Bot, 
  BookOpen, 
  Layers, 
  LogOut, 
  User as UserIcon, 
  Search, 
  ChevronRight,
  ShieldCheck,
  Mail,
  Key,
  X,
  Award,
  CheckCircle2
} from "lucide-react";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigateHome: () => void;
  onNavigateLanding?: () => void;
  activeDomainName?: string;
  activeProjectName?: string;
  onOpenDocReader?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
  onNavigateHome,
  onNavigateLanding,
  activeDomainName,
  activeProjectName,
  onOpenDocReader,
  searchQuery,
  setSearchQuery,
}) => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#2A374E] text-white border-b border-[#38475F] shadow-md transition-colors font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 text-left group transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1F98DC] flex items-center justify-center text-white shadow-md group-hover:bg-[#63A0D9] transition-colors">
                <Bot className="w-5.5 h-5.5" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white block leading-tight tracking-tight">
                  AI Project Hub
                </span>
                <span className="text-[11px] font-medium text-[#B8C9DD] block">
                  Documentation & Research Platform
                </span>
              </div>
            </button>

            {/* Breadcrumb path */}
            {(activeDomainName || activeProjectName) && (
              <div className="hidden md:flex items-center gap-2 text-xs font-medium text-[#B8C9DD] ml-4 pl-4 border-l border-[#38475F]">
                <button
                  onClick={onNavigateHome}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-[#1F98DC]" />
                  Dashboard
                </button>
                {activeDomainName && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-[#63A0D9]" />
                    <span className="text-white font-semibold truncate max-w-[150px]">
                      {activeDomainName}
                    </span>
                  </>
                )}
                {activeProjectName && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-[#63A0D9]" />
                    <span className="text-[#1F98DC] font-semibold truncate max-w-[180px]">
                      {activeProjectName}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden lg:block">
            <div className="relative">
              <Search className="w-4 h-4 text-[#B8C9DD] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search domains, projects, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-[#38475F] border border-[#63A0D9]/30 rounded-lg text-white placeholder-[#B8C9DD] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] focus:bg-[#2A374E] transition-all"
              />
            </div>
          </div>

          {/* Actions & User Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">

            {onNavigateLanding && (
              <button
                onClick={onNavigateLanding}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-all cursor-pointer"
              >
                <span>⚡ Landing Page</span>
              </button>
            )}

            {activeProjectName && onOpenDocReader && (
              <button
                onClick={onOpenDocReader}
                className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1F98DC] hover:bg-[#63A0D9] border border-[#63A0D9] rounded-lg transition-all shadow-xs cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-white" />
                <span className="hidden lg:inline">Full Documentation Reader</span>
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-2 border-l border-[#38475F] pl-3">
                {/* Clickable Profile Button */}
                <button
                  onClick={() => setShowProfileModal(true)}
                  title="View Profile Details"
                  className="flex items-center gap-2.5 hover:bg-[#38475F] p-1.5 rounded-xl transition-all cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1F98DC] border-2 border-[#63A0D9] flex items-center justify-center text-white font-bold text-xs shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="hidden sm:block text-left">
                    <span className="text-xs font-bold text-white block truncate max-w-[120px]">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-[#B8C9DD] block uppercase tracking-wider font-mono">
                      {user.provider === "google" ? "Google OAuth" : "Registered User"}
                    </span>
                  </div>
                </button>

                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-2 text-[#B8C9DD] hover:text-[#EF4444] hover:bg-[#38475F] rounded-lg transition-colors ml-1 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onNavigateHome}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1F98DC] hover:bg-[#63A0D9] rounded-lg shadow-xs transition-all cursor-pointer"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* User Profile Details Modal styled with project HEX colors */}
      {showProfileModal && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12171F]/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#2A374E] border border-[#38475F] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-left">
            
            {/* Close Button */}
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 p-2 text-[#B8C9DD] hover:text-white rounded-xl hover:bg-[#38475F] transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Avatar & Name Header */}
            <div className="text-center relative z-10 mb-6">
              <div className="w-20 h-20 rounded-full bg-[#1F98DC] border-4 border-[#38475F] flex items-center justify-center text-white text-2xl font-extrabold shadow-xl mx-auto mb-3 overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>

              <h3 className="text-xl font-extrabold text-white tracking-tight">
                {user.name}
              </h3>
              
              {user.username && (
                <span className="text-xs font-semibold text-[#63A0D9] block mt-0.5">
                  @{user.username}
                </span>
              )}

              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-[#22C55E]/15 border border-[#22C55E]/40 rounded-full text-[#22C55E] text-[11px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Scholar Account</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-3 relative z-10 text-xs">
              
              {/* Email Address */}
              <div className="bg-[#38475F]/60 border border-[#38475F] rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1F98DC]/20 text-[#1F98DC] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] uppercase tracking-wider text-[#B8C9DD] font-semibold block">
                    Email Address
                  </span>
                  <span className="text-white font-medium truncate block">
                    {user.email}
                  </span>
                </div>
              </div>

              {/* Authentication Provider */}
              <div className="bg-[#38475F]/60 border border-[#38475F] rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#63A0D9]/20 text-[#63A0D9] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#B8C9DD] font-semibold block">
                    Authentication Method
                  </span>
                  <span className="text-white font-semibold block capitalize">
                    {user.provider === "google" ? "Google OAuth 2.0 Single Sign-On" : "Email & Password Hashed Session"}
                  </span>
                </div>
              </div>

              {/* Unique Account ID */}
              <div className="bg-[#38475F]/60 border border-[#38475F] rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1F98DC]/20 text-[#1F98DC] flex items-center justify-center shrink-0">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#B8C9DD] font-semibold block">
                    Account ID
                  </span>
                  <span className="text-white font-mono text-[11px] block truncate">
                    {user.id}
                  </span>
                </div>
              </div>

              {/* Platform Privileges */}
              <div className="bg-[#38475F]/60 border border-[#38475F] rounded-2xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B8C9DD] font-semibold block">
                      Platform Access
                    </span>
                    <span className="text-white font-semibold block">
                      20 Domains & Gemini 3.6 AI
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="mt-6 pt-4 border-t border-[#38475F] flex items-center justify-between gap-3 relative z-10">
              <button
                type="button"
                onClick={() => {
                  setShowProfileModal(false);
                  onLogout();
                }}
                className="py-2.5 px-4 bg-[#EF4444]/15 hover:bg-[#EF4444]/25 border border-[#EF4444]/30 text-[#EF4444] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>

              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="py-2.5 px-5 bg-[#1F98DC] hover:bg-[#63A0D9] text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
