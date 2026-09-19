"use client";

import { Calendar, MapPin, Video, ExternalLink } from "lucide-react";

export default function EventsPage() {
  const events = [
    {
      title: "Building Scalable Next.js 15 Architectures",
      type: "Online Webinar",
      date: "August 24, 2026",
      time: "4:00 PM - 5:30 PM IST",
      location: "Zoom Sockets Streaming",
      desc: "An engineering-focused workshop mapping dynamic routing models, server cache optimization, and Tailwind CSS v4 variables configuration.",
      online: true
    },
    {
      title: "Bangalore Digital Agency Developers Meetup",
      type: "In-Person Event",
      date: "September 12, 2026",
      time: "6:00 PM - 9:00 PM IST",
      location: "Aratha Office Lounge, Bangalore",
      desc: "Connect with local tech founders, UI designers, and API middleware developers to discuss headless commerce scaling frameworks.",
      online: false
    },
    {
      title: "Agile Scoping & Lead Qualification with AI Nodes",
      type: "Developer Hackathon",
      date: "October 05, 2026",
      time: "10:00 AM - 6:00 PM IST",
      location: "Google Meet Workspace",
      desc: "Compete with developer teams to compose automated proposals and lead validation scripts utilizing LLMs and vector database schemas.",
      online: true
    }
  ];

  return (
    <div className="relative w-full py-16 px-6 max-w-5xl mx-auto overflow-hidden">
      {/* Decorative Blob */}
      <div className="glow-blob bg-accent bottom-10 left-10 opacity-15" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Community & Events</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mt-1">
          Agency <span className="text-gradient-gold">Events & Webinars</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          Join our technical workshops, developer meetups, and digital marketing seminars to learn modern optimization tactics.
        </p>
      </div>

      {/* Events list */}
      <div className="flex flex-col gap-6 relative z-10">
        {events.map((evt, index) => (
          <div key={index} className="glass-panel p-6 sm:p-8 border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-accent/15 border border-accent/20 text-accent text-[9px] font-extrabold uppercase tracking-wider">
                  {evt.type}
                </span>
                <span className="text-slate-500 text-[10px]">&bull; {evt.date}</span>
              </div>
              
              <h3 className="text-lg font-bold text-white leading-tight">{evt.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">{evt.desc}</p>
              
              {/* Event meta tags */}
              <div className="flex flex-wrap items-center gap-4 mt-2 text-[10px] text-slate-500">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Calendar className="w-3.5 h-3.5" /> {evt.time}
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  {evt.online ? <Video className="w-3.5 h-3.5 text-accent" /> : <MapPin className="w-3.5 h-3.5 text-secondary" />}
                  {evt.location}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert(`Simulating registration workspace for event: ${evt.title}`)}
              className="px-6 py-3 rounded-xl bg-slate-900 border border-white/10 hover:border-white/25 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Register Seat</span>
              <ExternalLink className="w-3.5 h-3.5 text-secondary" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
