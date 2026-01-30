// @ts-nocheck
// Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Home,
  Sparkles,
  BookOpen,
  Mail,
  Timer,
  Bot,
  ListChecks,
  CalendarDays,
  FileText,
  HelpCircle,
  Map,
  LifeBuoy,
  Building2,
  Users,
  Briefcase,
  Newspaper,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import QBtronLogo from "../../assets/QBtron.png";

const GREEN = "#2d6a4f";

const resources = [
  {
    items: [
      { label: "FAQ", desc: "Find answers to common questions", icon: HelpCircle, href: "/#faq" },
      { label: "Team", desc: "Get to know the team behind QBTron", icon: Users, href: "#" },
      { label: "Contact", desc: "Get in touch with our team", icon: Mail, href: "#" },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const slowScrollTo = (element) => {
    const navbarHeight = 250; // Safety buffer
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1200; // Slower scroll
    let startTime = null;

    // Ease in-out cubic
    const ease = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * ease(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    requestAnimationFrame(animation);
  };

  const handleLinkClick = (e, href) => {
    if (href.includes("#")) {
      e.preventDefault();
      setOpen(false); // Close dropdown immediately

      const [path, hash] = href.split("#");
      const targetPath = path || "/";
      const isSamePage = location.pathname === targetPath || (targetPath === "/" && location.pathname === "/");

      if (isSamePage) {
        // Wait for dropdown to start closing
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) slowScrollTo(el);
        }, 300);
      } else {
        navigate(targetPath);
        // Wait for navigation and potential layout shifts
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) slowScrollTo(el);
        }, 500);
      }
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    const onDown = (e) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header ref={headerRef} className="w-full bg-neutral-950">
      {/* Top bar */}
      <nav className="relative w-full bg-neutral-950 text-white py-1">
        {/* subtle vignette like your screenshot */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_0%,rgba(120,40,40,0.35),transparent_60%)]" />
        </div>

        <div className="relative flex h-14 w-full items-center justify-between px-6">
          {/* Left */}
          <div className="flex items-center gap-10">
            <a href="/" className="flex items-center justify-center gap-2">
              <img src={QBtronLogo} alt="QBTron" className="h-7 w-auto" />
              <span className="text-2xl font-semibold italic tracking-tight">QBTron</span>
            </a>

            <div className="hidden items-center gap-8 text-md text-white/80 md:flex">
              <a href="/" className="hover:text-white">
                Home
              </a>
              <a href="/AboutUs" className="hover:text-white">
                About Us
              </a>
              <a href="/Features" className="hover:text-white">
                Features
              </a>
              <a
                href="/#faq"
                onClick={(e) => handleLinkClick(e, "/#faq")}
                className="hover:text-white"
              >
                FAQ
              </a>
              <a
                href="/#footer"
                onClick={(e) => handleLinkClick(e, "/#footer")}
                className="hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Button size="lg" asChild className="rounded-full" style={{ backgroundColor: "#0A0A0A" }}>
              <a href="/SignIn" className="text-white/80 hover:text-white">
                Sign in
              </a>
            </Button>
            <Button size="lg" asChild className="rounded-full" style={{ backgroundColor: GREEN }}>
              <a href="#" className="font-semibold text-white">
                Start free
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* In-flow dropdown section (animated) */}
      <section
        className={[
          "w-full bg-neutral-950 text-white overflow-hidden",
          "transition-all duration-500 ease-in-out",
          "motion-reduce:transition-none",
          open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "mx-auto max-w-6xl px-6 py-4",
            "transition-all duration-500 ease-in-out",
            "motion-reduce:transition-none",
            open ? "translate-y-0" : "-translate-y-4",
          ].join(" ")}
        >
          {/* centered panel */}
          <div
            className={[
              "mx-auto w-full max-w-5xl",
              "bg-neutral-950/95 p-8 backdrop-blur",
              "transition-all duration-500 ease-in-out",
              "motion-reduce:transition-none",
              open ? "scale-100" : "scale-[0.98]",
            ].join(" ")}
          >
            <div className="flex flex-col gap-6">
              {resources.map((col, idx) => (
                <div key={idx}>
                  {col.title && (
                    <div className="mb-3 text-[14px] font-semibold uppercase tracking-wider text-white/70">
                      {col.title}
                    </div>
                  )}

                  <div className="flex justify-evenly gap-4">
                    {col.items.map((it) => {
                      const Icon = it.icon;
                      return (
                        <a
                          key={it.label}
                          href={it.href}
                          onClick={(e) => handleLinkClick(e, it.href)}
                          className="group flex flex-1 items-start gap-3 rounded-lg p-3 hover:bg-white/5"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5">
                            <Icon className="h-5 w-5 text-white/80" />
                          </div>

                          <div className="min-w-0">
                            <div className="text-md font-semibold text-white">{it.label}</div>
                            {it.desc && (
                              <div className="mt-1 text-[13px] leading-snug text-white/55">
                                {it.desc}
                              </div>
                            )}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 h-px w-full bg-white/10" />
          </div>
        </div>
      </section>
    </header>
  );
}
