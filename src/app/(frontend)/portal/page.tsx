"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  FolderOpen,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  UploadCloud,
  LogOut,
  Send,
  Plus,
  AlertCircle,
  File,
  ChevronRight,
  ExternalLink,
  Lock,
  User,
  CheckSquare
} from "lucide-react";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  phase: string;
}

interface Invoice {
  id: string;
  item: string;
  amount: number;
  date: string;
  status: "Paid" | "Unpaid";
}

interface SharedFile {
  id: string;
  name: string;
  size: string;
  date: string;
  by: "Agency" | "Client";
}

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: "Open" | "In Progress" | "Resolved";
  date: string;
}

interface ScheduledMeeting {
  id: string;
  topic: string;
  date: string;
  time: string;
  platform: "Zoom" | "Google Meet" | "MS Teams";
}

export default function ClientPortal() {
  // Authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("client@aratha.com");
  const [password, setPassword] = useState("guest");
  const [authError, setAuthError] = useState("");

  // Portal tabs
  const [activeTab, setActiveTab] = useState<
    "overview" | "timeline" | "tasks" | "files" | "invoices" | "meetings" | "support" | "chat"
  >("overview");

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: "n1", text: "New wireframes shared by UI/UX team.", read: false, time: "2 hours ago" },
    { id: "n2", text: "Invoice #INV-2026-08 for Phase 2 is due.", read: false, time: "1 day ago" },
    { id: "n3", text: "Project kickoff consultation scheduled successfully.", read: true, time: "3 days ago" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Simulated project states
  const [tasks, setTasks] = useState<Task[]>([
    { id: "t1", title: "Approve Sitemap & Architecture Plan", completed: true, phase: "Discovery" },
    { id: "t2", title: "Review brand styleboard & color options", completed: true, phase: "Design" },
    { id: "t3", title: "Figma High-Fidelity prototypes review", completed: false, phase: "Design" },
    { id: "t4", title: "Approve database schema and schema layout", completed: false, phase: "Development" },
    { id: "t5", title: "Perform copy audit for services sections", completed: false, phase: "Content" },
    { id: "t6", title: "Verify staging site build benchmarks", completed: false, phase: "Testing" }
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: "INV-2026-01", item: "Phase 1: Discovery & Strategy Scoping", amount: 1500, date: "2026-07-10", status: "Paid" },
    { id: "INV-2026-02", item: "Phase 2: UI/UX Wireframe & Design System", amount: 2500, date: "2026-08-01", status: "Unpaid" },
    { id: "INV-2026-03", item: "Phase 3: Next.js Frontend Development", amount: 4999, date: "2026-08-15", status: "Unpaid" }
  ]);

  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([
    { id: "f1", name: "aratha_scoping_brief_v1.pdf", size: "2.4 MB", date: "2026-07-12", by: "Agency" },
    { id: "f2", name: "aratha_siteboard_wireframes_v2.fig", size: "12.8 MB", date: "2026-08-02", by: "Agency" }
  ]);

  const [tickets, setTickets] = useState<SupportTicket[]>([
    { id: "TCK-402", subject: "Questions on SEO Redirect Strategy", category: "SEO / Marketing", status: "In Progress", date: "2026-08-04" },
    { id: "TCK-105", subject: "Hosting access to AWS test sandbox", category: "Cloud & Devops", status: "Resolved", date: "2026-07-28" }
  ]);

  const [meetings, setMeetings] = useState<ScheduledMeeting[]>([
    { id: "m1", topic: "Weekly Development Standup", date: "2026-08-10", time: "11:00 AM", platform: "Zoom" }
  ]);

  // Uploader input simulation
  const [uploadFileName, setUploadFileName] = useState("");
  
  // Payment Modal Simulation
  const [payingInvoice, setPayingInvoice] = useState<Invoice | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Booking Meeting state
  const [newMeetingTopic, setNewMeetingTopic] = useState("UI Design Review");
  const [newMeetingDate, setNewMeetingDate] = useState("");
  const [newMeetingTime, setNewMeetingTime] = useState("10:00 AM");
  const [newMeetingPlatform, setNewMeetingPlatform] = useState<"Zoom" | "Google Meet" | "MS Teams">("Zoom");

  // Support Ticket Form state
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketCategory, setNewTicketCategory] = useState("General Question");

  // Live Chat state
  const [chatMessages, setChatMessages] = useState([
    { sender: "pm", text: "Hello! I am your Project Manager. Welcome to the portal.", time: "10:05 AM" },
    { sender: "client", text: "Thanks! Happy to track our project build in one dashboard.", time: "10:10 AM" },
    { sender: "pm", text: "Excellent. Phase 1 is completed. The wireframes for Phase 2 are in the 'Files' tab.", time: "10:12 AM" }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Toast notifier
  const [toast, setToast] = useState("");

  // Sync state with localstorage if running client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuth = localStorage.getItem("client_auth_logged_in");
      if (savedAuth === "true") {
        setIsLoggedIn(true);
      }
      
      const localInvoices = localStorage.getItem("aratha_client_invoices");
      if (localInvoices) setInvoices(JSON.parse(localInvoices));

      const localFiles = localStorage.getItem("aratha_client_files");
      if (localFiles) setSharedFiles(JSON.parse(localFiles));

      const localMeetings = localStorage.getItem("aratha_client_meetings");
      if (localMeetings) setMeetings(JSON.parse(localMeetings));

      const localTickets = localStorage.getItem("aratha_client_tickets");
      if (localTickets) setTickets(JSON.parse(localTickets));

      const localTasks = localStorage.getItem("aratha_client_tasks");
      if (localTasks) setTasks(JSON.parse(localTasks));
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "client@aratha.com" && password === "guest") {
      setIsLoggedIn(true);
      localStorage.setItem("client_auth_logged_in", "true");
      triggerToast("Logged in successfully!");
    } else {
      setAuthError("Invalid credentials. Try client@aratha.com / guest");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("client_auth_logged_in");
    triggerToast("Logged out successfully.");
  };

  // Toggle tasks
  const handleTaskToggle = (id: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTasks(updated);
    localStorage.setItem("aratha_client_tasks", JSON.stringify(updated));
    triggerToast("Task status updated!");
  };

  // Calculate project progress %
  const calculateProgress = () => {
    const done = tasks.filter((t) => t.completed).length;
    return Math.round((done / tasks.length) * 100);
  };

  // Upload file simulation
  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName.trim()) return;

    const newFile: SharedFile = {
      id: `f_${Date.now()}`,
      name: uploadFileName,
      size: "1.2 MB",
      date: new Date().toISOString().split("T")[0],
      by: "Client"
    };

    const updated = [...sharedFiles, newFile];
    setSharedFiles(updated);
    localStorage.setItem("aratha_client_files", JSON.stringify(updated));
    setUploadFileName("");
    
    // Add dynamic notification
    const newNotif = {
      id: `n_${Date.now()}`,
      text: `Client uploaded file: ${newFile.name}`,
      read: false,
      time: "Just now"
    };
    setNotifications([newNotif, ...notifications]);
    
    triggerToast("File uploaded successfully!");
  };

  // Submit invoice payment
  const processPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv) {
      alert("Please fill all payment details.");
      return;
    }

    if (payingInvoice) {
      const updated = invoices.map((inv) =>
        inv.id === payingInvoice.id ? { ...inv, status: "Paid" as const } : inv
      );
      setInvoices(updated);
      localStorage.setItem("aratha_client_invoices", JSON.stringify(updated));
      
      setPaymentSuccess(true);
      setTimeout(() => {
        setPayingInvoice(null);
        setPaymentSuccess(false);
        setCardNumber("");
        setExpiry("");
        setCvv("");
        triggerToast(`Payment successful for Invoice ${payingInvoice.id}!`);
      }, 1500);
    }
  };

  // Schedule meeting
  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetingDate) {
      alert("Please select a date.");
      return;
    }

    const newMeet: ScheduledMeeting = {
      id: `m_${Date.now()}`,
      topic: newMeetingTopic,
      date: newMeetingDate,
      time: newMeetingTime,
      platform: newMeetingPlatform
    };

    const updated = [...meetings, newMeet];
    setMeetings(updated);
    localStorage.setItem("aratha_client_meetings", JSON.stringify(updated));
    
    triggerToast("Meeting scheduled successfully!");
    setNewMeetingDate("");
  };

  // Create ticket
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim()) return;

    const newTck: SupportTicket = {
      id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
      subject: newTicketSubject,
      category: newTicketCategory,
      status: "Open",
      date: new Date().toISOString().split("T")[0]
    };

    const updated = [newTck, ...tickets];
    setTickets(updated);
    localStorage.setItem("aratha_client_tickets", JSON.stringify(updated));
    
    setNewTicketSubject("");
    triggerToast("Support ticket raised successfully!");
  };

  // Live chat send
  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const clientMsg = {
      sender: "client",
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setChatMessages((prev) => [...prev, clientMsg]);
    setChatInput("");

    // PM replies
    setTimeout(() => {
      let pmReply = "I have received your message. I am looking into this with the development team and will update you soon.";
      const query = clientMsg.text.toLowerCase();

      if (query.includes("wireframe") || query.includes("figma") || query.includes("design")) {
        pmReply = "Yes, our designers are working on the Figma high-fidelity view right now. We expect to share the updated layout link tomorrow morning.";
      } else if (query.includes("invoice") || query.includes("payment") || query.includes("pay")) {
        pmReply = "Thanks for the payment! Our billing console updates instantly. You can access printable receipt downloads directly from the 'Invoices' panel.";
      } else if (query.includes("time") || query.includes("status") || query.includes("timeline") || query.includes("when")) {
        pmReply = "We are on schedule. The Frontend assembly starts next week. Please check the 'Timeline & Roadmap' tab to review active phases.";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "pm",
          text: pmReply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }, 1500);
  };

  // Mark all notifications read
  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  // Unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 relative py-12">
        <div className="glow-blob bg-accent top-1/4 left-1/4 opacity-15" />
        <div className="glow-blob bg-secondary bottom-1/4 right-1/4 opacity-10" />

        <div className="w-full max-w-md bg-slate-900 border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-3 text-center mb-8">
            <div className="flex items-center justify-center p-3 rounded-2xl neu-flat border border-white/10 shadow-xl">
              <Image
                src="/logo.png"
                alt="Aratha Logo"
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Aratha Client Space</h1>
              <p className="text-slate-400 text-xs mt-1">Track schedules, approve design files, pay invoices, and contact support.</p>
            </div>
          </div>

          {authError && (
            <div className="mb-6 p-3 rounded-lg bg-red-950/50 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Client Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent"
                placeholder="email@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Secure Access Key</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-sm transition-all shadow-lg shadow-accent/25 hover:shadow-accent/45 mt-2 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Access Secure Workspace</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <span className="text-[11px] text-slate-500">
              Demo Credentials: <span className="text-secondary font-mono">client@aratha.com</span> / <span className="text-secondary font-mono">guest</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] max-w-7xl mx-auto px-6 py-8 relative">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-24 right-6 bg-slate-900 border border-secondary text-secondary px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 font-semibold text-xs animate-bounce">
          <CheckCircle2 className="w-4.5 h-4.5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Banner and Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
              Live Project
            </span>
            <span className="text-slate-400 text-xs">Project Ref: #ARATHA-102</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1">
            Aratha Redesign Board
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Logged in as <span className="text-secondary font-semibold">{email}</span>
          </p>
        </div>

        {/* Notifications & Logout actions */}
        <div className="flex items-center gap-4 relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all relative"
            aria-label="Toggle notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-secondary text-slate-950 text-[9px] font-extrabold flex items-center justify-center border-2 border-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50 p-4 animate-fade-in flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Alerts Log</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[10px] text-accent hover:underline font-semibold">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg border text-xs flex flex-col gap-1 transition-all ${
                      n.read ? "bg-slate-950/20 border-transparent text-slate-400" : "bg-slate-800/40 border-white/5 text-white"
                    }`}
                  >
                    <span>{n.text}</span>
                    <span className="text-[9px] text-slate-500">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-red-500/25 hover:text-red-400 text-slate-400 transition-all text-xs font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Nav (Left 3) + Content (Right 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Navigation Bar */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Progress widget */}
          <div className="glass-panel p-6 border-white/10 flex flex-col gap-3">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono">Workspace Completion</span>
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-extrabold text-secondary font-mono">{calculateProgress()}%</span>
              <span className="text-xs text-slate-400 font-medium">Phase 2 of 5</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-accent h-full rounded-full transition-all duration-500"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 leading-relaxed mt-1">
              Currently compiling Tailwind CSS v4 assets & CMS layouts in dev sandbox.
            </span>
          </div>

          {/* Nav Tabs */}
          <div className="glass-panel p-3 border-white/10 flex flex-col gap-1">
            {[
              { id: "overview", label: "Dashboard Hub", icon: User },
              { id: "timeline", label: "Timeline & Roadmap", icon: Clock },
              { id: "tasks", label: "Scope Checklist", icon: CheckSquare },
              { id: "files", label: "Files & Mockups", icon: FolderOpen },
              { id: "invoices", label: "Invoices & Payments", icon: CreditCard },
              { id: "meetings", label: "Sync Consultations", icon: Calendar },
              { id: "support", label: "Support Desk Tickets", icon: AlertCircle },
              { id: "chat", label: "Direct Workspace Chat", icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setShowNotifications(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold border transition-all ${
                    activeTab === tab.id
                      ? "bg-white/5 border-white/10 text-white font-bold"
                      : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 text-secondary shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Workspace */}
        <div className="lg:col-span-9 glass-panel p-6 sm:p-8 border-white/10 min-h-[480px] z-10 relative">
          
          {/* TAB 1: OVERVIEW HUB */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Client Hub Overview</h2>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  Real-time status summaries of deliverables, shared scoping files, and active financial agreements.
                </p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-slate-950/60 border border-white/5 rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden group">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mt-2">Next Deliverable</span>
                  <span className="text-white text-sm font-semibold">High-Fi prototypes review</span>
                  <span className="text-[10px] text-secondary font-semibold font-mono">Due Aug 12, 2026</span>
                </div>

                <div className="bg-slate-950/60 border border-white/5 rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden group">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mt-2">Outstanding Invoices</span>
                  <span className="text-white text-sm font-semibold">
                    ${invoices.filter((i) => i.status === "Unpaid").reduce((acc, c) => acc + c.amount, 0).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-red-400 font-semibold font-mono">
                    {invoices.filter((i) => i.status === "Unpaid").length} Action Pending
                  </span>
                </div>

                <div className="bg-slate-950/60 border border-white/5 rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden group">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <FolderOpen className="w-4 h-4" />
                  </div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mt-2">File Vault Size</span>
                  <span className="text-white text-sm font-semibold">{sharedFiles.length} Shared Scopes</span>
                  <span className="text-[10px] text-slate-500 font-mono">Total size 15.2 MB</span>
                </div>
              </div>

              {/* Milestone Alert Panel */}
              <div className="w-full p-4.5 rounded-2xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/25 flex flex-col sm:flex-row items-center gap-4 justify-between">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <AlertCircle className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <h4 className="text-white text-xs font-bold">Feedback Required for Figma Prototypes</h4>
                    <p className="text-slate-400 text-[10px] mt-0.5 leading-relaxed">
                      Our design system assets are complete. Please review the prototype flow and confirm layouts.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("tasks")}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
                >
                  Go to Tasks
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: TIMELINE & ROADMAP */}
          {activeTab === "timeline" && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Project Timeline Roadmap</h2>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  Visual breakdown of project milestone phases, target schedules, and delivery status logs.
                </p>
              </div>

              <div className="relative pl-6 border-l border-white/10 flex flex-col gap-10 py-2">
                {[
                  { phase: "Phase 1: Discovery & Strategy Scoping", status: "Completed", date: "July 1 - July 12", desc: "Define website architecture, content schemas, brand assets targets, and compile tech stack briefs." },
                  { phase: "Phase 2: UI/UX Wireframes & Prototypes", status: "Active", date: "July 15 - Aug 10", desc: "Design styleboards, interactive dashboard wireframes, visual Figma prototype checkouts, and custom animations specs." },
                  { phase: "Phase 3: React Next.js Engineering", status: "Pending", date: "Aug 12 - Sept 5", desc: "Construct fully custom frontend layouts using Tailwind CSS v4, dynamic JSON-LD tags, and backend CRM integration." },
                  { phase: "Phase 4: QA & Acceptance Testing", status: "Pending", date: "Sept 8 - Sept 15", desc: "Auditing sitemap accessibility, Lighthouse benchmark scores target (95+), and testing multi-gateway Stripe workflows." }
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Node Dot */}
                    <span
                      className={`absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-slate-950 flex items-center justify-center ${
                        item.status === "Completed"
                          ? "bg-emerald-500"
                          : item.status === "Active"
                          ? "bg-accent animate-ping"
                          : "bg-slate-800"
                      }`}
                    />
                    {item.status === "Active" && (
                      <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-accent border-2 border-slate-950" />
                    )}

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-bold text-white">{item.phase}</h3>
                        <span
                          className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                            item.status === "Completed"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : item.status === "Active"
                              ? "bg-accent/15 text-accent border border-accent/20"
                              : "bg-slate-800 text-slate-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{item.date}</span>
                      <p className="text-slate-400 text-xs leading-relaxed max-w-xl">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TASKS CHECKLIST */}
          {activeTab === "tasks" && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Scope Acceptance Checklist</h2>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  Approve and track action items to guide the agency team. Click checkboxes to mark task completion.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleTaskToggle(task.id)}
                    className="p-4 bg-slate-950/60 border border-white/5 rounded-xl hover:border-white/15 transition-all flex items-center justify-between cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-5.5 h-5.5 rounded-md border flex items-center justify-center transition-all ${
                          task.completed
                            ? "bg-accent border-accent text-white"
                            : "border-white/10 bg-slate-900 group-hover:border-white/30"
                        }`}
                      >
                        {task.completed && <CheckSquare className="w-4 h-4" />}
                      </div>
                      <span className={`text-xs font-semibold ${task.completed ? "line-through text-slate-500" : "text-white"}`}>
                        {task.title}
                      </span>
                    </div>
                    <span className="text-[9px] uppercase font-bold text-slate-500 bg-slate-900 px-2 py-0.5 rounded font-mono">
                      {task.phase}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FILES & MOCKUPS */}
          {activeTab === "files" && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Shared Document Vault</h2>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  Secure depository for project contracts, sitemap wireframes, asset kits, and proposal documents.
                </p>
              </div>

              {/* Uploader Simulator */}
              <form onSubmit={handleFileUpload} className="p-6 bg-slate-950/60 border border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-3 text-center">
                <UploadCloud className="w-10 h-10 text-slate-500" />
                <div>
                  <h4 className="text-white text-xs font-bold">Upload Custom Brief or Logo Kit</h4>
                  <p className="text-slate-500 text-[10px] mt-0.5">Supports PDF, PNG, JPG, or FIG formats up to 50MB</p>
                </div>
                <div className="flex gap-2 max-w-sm w-full mt-2">
                  <input
                    type="text"
                    placeholder="Enter file name (e.g. logo_brand.png)..."
                    value={uploadFileName}
                    onChange={(e) => setUploadFileName(e.target.value)}
                    className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    disabled={!uploadFileName.trim()}
                    className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 shrink-0"
                  >
                    Upload File
                  </button>
                </div>
              </form>

              {/* File list */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono">Shared Files</span>
                {sharedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-4 bg-slate-950/60 border border-white/5 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <File className="w-5.5 h-5.5 text-secondary shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-white">{file.name}</span>
                        <span className="text-[9px] text-slate-500">
                          {file.size} &bull; Shared by {file.by} on {file.date}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Simulating file download of: ${file.name}`)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/5 hover:border-white/15 text-slate-400 hover:text-white transition-colors"
                      title="Download file"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INVOICES & PAYMENTS */}
          {activeTab === "invoices" && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Invoice Receipts & Payments</h2>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  Review invoice dates, payment details, and complete outstanding due values via secure simulated checkouts.
                </p>
              </div>

              {/* Invoices list */}
              <div className="flex flex-col gap-3">
                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-5 bg-slate-950/60 border border-white/5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{inv.id}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                            inv.status === "Paid"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-300">{inv.item}</h4>
                      <span className="text-[9px] text-slate-500 font-mono">Issued Date: {inv.date}</span>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t border-white/5 sm:border-transparent pt-3 sm:pt-0">
                      <span className="text-base font-extrabold text-white font-mono">${inv.amount.toLocaleString()}</span>
                      {inv.status === "Unpaid" ? (
                        <button
                          onClick={() => setPayingInvoice(inv)}
                          className="px-4.5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold transition-all shadow-md shadow-accent/15"
                        >
                          Pay Invoice
                        </button>
                      ) : (
                        <button
                          onClick={() => alert(`Simulating invoice PDF receipt download for: ${inv.id}`)}
                          className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-all text-xs font-semibold"
                        >
                          <Download className="w-4.5 h-4.5" />
                          <span>Receipt</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* PAYMENT CHECKOUT MODAL SIMULATOR */}
              {payingInvoice && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
                  <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-8 relative flex flex-col gap-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-slate-500 font-mono">Secure Payment Gateway</span>
                        <h3 className="text-white text-sm font-bold mt-0.5">Pay Invoice {payingInvoice.id}</h3>
                      </div>
                      <button
                        onClick={() => setPayingInvoice(null)}
                        className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-lg border border-white/5 hover:border-white/15"
                      >
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </button>
                    </div>

                    {paymentSuccess ? (
                      <div className="py-8 flex flex-col items-center gap-3 text-center animate-fade-in">
                        <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                        <h4 className="text-white text-sm font-bold">Transaction Approved!</h4>
                        <p className="text-slate-400 text-xs leading-normal">
                          Stripe simulated payment succeeded. Receipt generated instantly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={processPayment} className="flex flex-col gap-4">
                        <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-white/5 font-mono">
                          <span className="text-xs text-slate-400">Total Scoped Price</span>
                          <span className="text-lg font-bold text-secondary">${payingInvoice.amount.toLocaleString()}</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Debit/Credit Card Number</label>
                          <input
                            type="text"
                            required
                            placeholder="4000 1234 5678 9010"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Expiry Date</label>
                            <input
                              type="text"
                              required
                              placeholder="MM/YY"
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent font-mono"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">CVV Code</label>
                            <input
                              type="password"
                              required
                              placeholder="•••"
                              maxLength={3}
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent font-mono"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 mt-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Lock className="w-4 h-4" />
                          <span>Submit Payment Scopes</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SYNC MEETINGS */}
          {activeTab === "meetings" && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Sync Consultations Calendar</h2>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  Book meeting reviews directly with agency team leaders on Zoom, Teams, or Google Calendar.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Booking form */}
                <form onSubmit={handleScheduleMeeting} className="md:col-span-6 flex flex-col gap-4.5 bg-slate-950/40 p-6 rounded-2xl border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono">Book New Consultation</span>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Meeting Topic</label>
                    <select
                      value={newMeetingTopic}
                      onChange={(e) => setNewMeetingTopic(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                    >
                      <option>UI Design Review</option>
                      <option>Tailwind v4 Integration Dev Sync</option>
                      <option>SEO Strategy Consultation</option>
                      <option>Monthly Performance Scoping</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase text-slate-400">Date</label>
                      <input
                        type="date"
                        required
                        value={newMeetingDate}
                        onChange={(e) => setNewMeetingDate(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase text-slate-400">Time Slot</label>
                      <input
                        type="text"
                        required
                        placeholder="11:00 AM"
                        value={newMeetingTime}
                        onChange={(e) => setNewMeetingTime(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Platform Integrator</label>
                    <div className="grid grid-cols-3 gap-2 bg-slate-900 p-1 rounded-xl border border-white/5">
                      {(["Zoom", "Google Meet", "MS Teams"] as const).map((plat) => (
                        <button
                          key={plat}
                          type="button"
                          onClick={() => setNewMeetingPlatform(plat)}
                          className={`py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wide transition-all ${
                            newMeetingPlatform === plat ? "bg-accent text-white" : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {plat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold transition-all shadow-md mt-2 flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Consultation</span>
                  </button>
                </form>

                {/* Scheduled list */}
                <div className="md:col-span-6 flex flex-col gap-4">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono">Upcoming Synced Slots</span>
                  {meetings.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-950/20 border border-white/5 rounded-2xl text-center text-slate-500 text-xs">
                      No meetings scheduled yet. Use the booking editor to schedule consultation syncs.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {meetings.map((meet) => (
                        <div
                          key={meet.id}
                          className="p-4 bg-slate-950/60 border border-white/5 rounded-xl flex items-center justify-between gap-4"
                        >
                          <div className="flex flex-col gap-1">
                            <h4 className="text-xs font-bold text-white">{meet.topic}</h4>
                            <span className="text-[9px] text-slate-500 font-mono">
                              {meet.date} &bull; {meet.time}
                            </span>
                            <span className="text-[8px] font-extrabold uppercase text-accent">{meet.platform} integration</span>
                          </div>

                          <button
                            onClick={() => alert(`Launching mock ${meet.platform} session...`)}
                            className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-colors"
                            title="Join Consultation Call"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SUPPORT TICKETS */}
          {activeTab === "support" && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Support Desk Ticket Log</h2>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  Submit technical queries, review bug fixes, and track ticket resolutions logs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Ticket form */}
                <form onSubmit={handleCreateTicket} className="md:col-span-5 flex flex-col gap-4 bg-slate-950/40 p-6 rounded-2xl border border-white/5 h-fit">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono">Raise Support Ticket</span>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Broken links on career sub-page..."
                      value={newTicketSubject}
                      onChange={(e) => setNewTicketSubject(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Ticket Category</label>
                    <select
                      value={newTicketCategory}
                      onChange={(e) => setNewTicketCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                    >
                      <option>General Question</option>
                      <option>UI / UX Styling Fix</option>
                      <option>Cloud & Devops Access</option>
                      <option>SEO / Marketing Scopes</option>
                      <option>Invoicing & Payments</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={!newTicketSubject.trim()}
                    className="w-full py-3 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold transition-all disabled:opacity-50 mt-2 flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Raise Support Case</span>
                  </button>
                </form>

                {/* Ticket status table */}
                <div className="md:col-span-7 flex flex-col gap-3">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono">Active Technical Tickets</span>
                  {tickets.length === 0 ? (
                    <div className="text-center p-8 bg-slate-950/20 border border-white/5 rounded-2xl text-slate-500 text-xs">
                      No active tickets. Raise a support ticket using the editor.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {tickets.map((tck) => (
                        <div
                          key={tck.id}
                          className="p-4 bg-slate-950/60 border border-white/5 rounded-xl flex items-center justify-between"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] text-slate-500 font-mono">{tck.id} &bull; Category: {tck.category}</span>
                            <h4 className="text-xs font-bold text-white">{tck.subject}</h4>
                            <span className="text-[9px] text-slate-500">Submitted: {tck.date}</span>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                              tck.status === "Resolved"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : tck.status === "In Progress"
                                ? "bg-accent/15 text-accent border border-accent/20 animate-pulse"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            {tck.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: DIRECT CHAT WITH PM */}
          {activeTab === "chat" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Direct Project Workspace Chat</h2>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  Real-time direct messenger thread with your Aratha Account Manager regarding scoping syncs.
                </p>
              </div>

              {/* Chat frame */}
              <div className="bg-slate-950/50 border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[380px]">
                {/* Header status */}
                <div className="bg-slate-900 border-b border-white/5 p-4 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-extrabold text-white">
                      PM
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Sarah Jenkins</h4>
                    <span className="text-[9px] text-slate-400">Aratha Senior Account Lead (Online)</span>
                  </div>
                </div>

                {/* Messages body */}
                <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-2 max-w-[85%] ${
                        msg.sender === "client" ? "self-end flex-row-reverse" : "self-start"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <div
                          className={`px-3 py-2 rounded-xl text-xs ${
                            msg.sender === "client"
                              ? "bg-accent text-white rounded-tr-none"
                              : "bg-slate-900 text-slate-200 rounded-tl-none border border-white/5"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className={`text-[8px] text-slate-500 ${msg.sender === "client" ? "text-right" : "text-left"}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input form */}
                <form onSubmit={handleChatSend} className="p-3 bg-slate-900 border-t border-white/5 flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask standard project or scoping questions..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim()}
                    className="w-8 h-8 rounded-xl bg-accent hover:bg-accent-hover text-white flex items-center justify-center shrink-0 disabled:opacity-50 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
