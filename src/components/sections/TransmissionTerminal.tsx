"use client";

import React, { useState } from "react";
import { soundEngine } from "../../lib/soundEngine";
import { Send, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";

export const TransmissionTerminal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "transmitting" | "confirmed" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "> TERMINAL READY",
    "> AWAITING OUTBOUND TRANSMISSION PAYLOAD",
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Real validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      soundEngine.playLock();
      setStatus("error");
      setErrorMessage("ERR: INVALID CALL-SIGN / EMAIL ADDRESS SYNTAX.");
      return;
    }

    if (!message || message.trim().length < 5) {
      soundEngine.playLock();
      setStatus("error");
      setErrorMessage("ERR: TRANSMISSION PAYLOAD MUST BE AT LEAST 5 CHARACTERS.");
      return;
    }

    setStatus("transmitting");
    setErrorMessage("");
    soundEngine.playHover();

    setTerminalLogs([
      "> INITIATING QUANTUM RELAY HANDSHAKE",
      "> ENCRYPTING TRANSMISSION PAYLOAD (AES-256-GCM)",
      "> COMMENCING CARRIER WAVE BEACON",
    ]);

    setTimeout(() => {
      soundEngine.playTransmission();
      setTerminalLogs((prev) => [
        ...prev,
        "> PACKET ACKNOWLEDGED BY STYLIX-XD RELAY",
        "> TRANSMISSION DISPATCHED TO PRINCIPAL ARCHITECT",
        "> STATUS: 200 OK // SUCCESS",
      ]);
      setStatus("confirmed");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <section className="relative min-h-screen py-32 px-6 md:px-16 flex flex-col justify-between select-none pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="border-b border-white/10 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] mb-2">
              COMMS // RELAY UPLINK
            </div>
            <h2 className="font-chunko text-5xl sm:text-7xl md:text-8xl uppercase text-white tracking-wider leading-none">
              TRANSMISSION TERMINAL
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 max-w-sm">
            DISPATCH ENCRYPTED SIGNALS DIRECTLY TO STYLIX-XD (ASHU).
          </div>
        </div>

        {/* Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left: Input Form */}
          <div className="lg:col-span-7 border border-white/15 bg-[#08090C]/90 backdrop-blur-xl p-8 md:p-12 chamfer-corner shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
                  CALL-SIGN / RETURN EMAIL ADDRESS:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ARCHITECT@ORBITAL-STATION.ORG"
                  className="w-full bg-white/5 border border-white/15 px-4 py-3.5 text-white font-mono text-sm focus:outline-none focus:border-[#00F0FF] transition-all"
                  disabled={status === "transmitting"}
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
                  TRANSMISSION PAYLOAD / MESSAGE:
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="REQUESTING ARCHITECTURAL COLLABORATION ON NEXT-GEN SPATIAL COMPUTING PROJECT..."
                  className="w-full bg-white/5 border border-white/15 px-4 py-3.5 text-white font-mono text-sm focus:outline-none focus:border-[#00F0FF] transition-all resize-none"
                  disabled={status === "transmitting"}
                />
              </div>

              {errorMessage && (
                <div className="font-mono text-xs text-[#FF6B00] flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/30 p-3">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === "confirmed" && (
                <div className="font-mono text-xs text-[#00F0FF] flex items-center gap-2 bg-[#00F0FF]/10 border border-[#00F0FF]/30 p-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SIGNAL ENCRYPTED & TRANSMITTED SUCCESSFULLY.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "transmitting"}
                className="w-full py-4 bg-white text-black hover:bg-[#00F0FF] font-condensed text-xl uppercase tracking-wider font-bold transition-all chamfer-corner-sm flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <span>{status === "transmitting" ? "ENCRYPTING SIGNAL..." : "TRANSMIT SIGNAL ?"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right: Live Terminal Log Console */}
          <div className="lg:col-span-5 border border-white/15 bg-black/90 p-8 font-mono text-xs chamfer-corner shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <span className="text-zinc-500">// TELEMETRY CONSOLE FEED</span>
              <span className="text-[#00F0FF] animate-pulse">? LIVE</span>
            </div>

            <div className="space-y-3 min-h-[220px]">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="text-zinc-300 leading-relaxed flex items-start gap-2">
                  <span className="text-[#00F0FF] select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 mt-6 text-[11px] text-zinc-500 flex justify-between">
              <span>RELAY: NODE-SINGULARITY-01</span>
              <span>AES-256 VERIFIED</span>
            </div>
          </div>

        </div>

        {/* Big Typographic External Connections */}
        <div className="border-t border-white/10 pt-16">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-8">
            // EXTERNAL RELAYS & SOCIAL NETWORK ARCHIVE
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a
              href="https://github.com/StylixXD"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundEngine.playHover()}
              className="group border border-white/10 p-6 hover:border-[#00F0FF] transition-all bg-[#08090C]/60"
            >
              <div className="font-chunko text-3xl sm:text-4xl text-white group-hover:text-[#00F0FF] transition-colors flex items-center justify-between">
                <span>GITHUB</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#00F0FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <div className="font-mono text-xs text-zinc-500 mt-2">@StylixXD</div>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundEngine.playHover()}
              className="group border border-white/10 p-6 hover:border-[#00F0FF] transition-all bg-[#08090C]/60"
            >
              <div className="font-chunko text-3xl sm:text-4xl text-white group-hover:text-[#00F0FF] transition-colors flex items-center justify-between">
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#00F0FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <div className="font-mono text-xs text-zinc-500 mt-2">STYLIX-XD // ASHU</div>
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundEngine.playHover()}
              className="group border border-white/10 p-6 hover:border-[#00F0FF] transition-all bg-[#08090C]/60"
            >
              <div className="font-chunko text-3xl sm:text-4xl text-white group-hover:text-[#00F0FF] transition-colors flex items-center justify-between">
                <span>X / TWITTER</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#00F0FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <div className="font-mono text-xs text-zinc-500 mt-2">@StylixXD</div>
            </a>

            <a
              href="mailto:stylixxd@singularity.network"
              onMouseEnter={() => soundEngine.playHover()}
              className="group border border-white/10 p-6 hover:border-[#00F0FF] transition-all bg-[#08090C]/60"
            >
              <div className="font-chunko text-3xl sm:text-4xl text-white group-hover:text-[#00F0FF] transition-colors flex items-center justify-between">
                <span>EMAIL</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#00F0FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <div className="font-mono text-xs text-zinc-500 mt-2">DIRECT COMMS RELAY</div>
            </a>
          </div>
        </div>

      </div>

      {/* Shutdown / System Footer */}
      <div className="border-t border-white/10 pt-12 mt-24 flex flex-col sm:flex-row justify-between items-center font-mono text-xs text-zinc-500 gap-4">
        <div>ANTIGRAVITY // SINGULARITY OS  PRODUCTION IMMERSIVE SYSTEM</div>
        <div>ENGINEERED BY STYLIX-XD (ASHU) // 2026</div>
      </div>
    </section>
  );
};
