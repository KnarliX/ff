import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Users,
  UserCheck,
  Home,
  MessagesSquare,
  Youtube,
  BookOpen,
  Shield,
  Sparkles,
  Crown,
  LogOut,
  BadgeCheck,
  BadgeAlert,
} from "lucide-react";
import { discord } from "@/components/icons";
import { getLoginData, isLoggedIn, logout } from "@/lib/login";

export function VerificationPortal() {
  const [userData, setUserData] = useState(getLoginData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    setUserData(getLoginData());
    setLoading(false);
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      setUserData(null);
    }
  };

  // Not logged in
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101010] text-white font-[var(--font-family)]">
        <span className="flex items-center gap-2 animate-pulse text-lg">
          <Shield className="w-6 h-6 text-indigo-500" />
          Loading Portal...
        </span>
      </div>
    );
  }

  if (!isLoggedIn() || !userData) {
    return (
      <div
        data-aos="fade-up"
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#18182f] via-[#181926] to-[#0d0d13] text-white font-[var(--font-family)] px-4"
      >
        <div className="flex flex-col items-center p-8 rounded-3xl shadow-xl bg-[#18182faa] backdrop-blur">
          <div className="mb-6" data-aos="zoom-in">
            <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#5865F2]/20 shadow-lg">
              {discord ? (
                discord({ className: "w-12 h-12 text-[#5865F2]" })
              ) : (
                <Shield className="w-12 h-12 text-indigo-500" />
              )}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight" data-aos="fade-down">
            Welcome to Dreamer's Portal
          </h1>
          <p className="text-md text-gray-400 mb-6 max-w-md" data-aos="fade-up">
            Login with Discord to access your portal, verify your account, and unlock exclusive rewards!
          </p>
          <a
            href="https://discord-auth.pages.dev?to=/portal"
            data-aos="zoom-in-up"
            className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#404eed] transition px-7 py-3 rounded-2xl shadow-lg text-white font-bold text-lg"
          >
            {discord ? discord({ className: "w-6 h-6" }) : null}
            Login with Discord
          </a>
        </div>

        <footer className="mt-10 text-gray-500 text-xs" data-aos="fade-up">
          &copy; {new Date().getFullYear()} Dreamer's Land • All Rights Reserved
        </footer>
      </div>
    );
  }

  // Logged in state
  const {
    userid, username, name, avatar, avatar_decoration_data, verified,
    banner, accent_color,
  } = userData;

  const avatarUrl = `https://cdn.discordapp.com/avatars/${userid}/${avatar}.webp?size=256`;
  const decorationUrl = avatar_decoration_data
    ? `https://cdn.discordapp.com/avatar-decoration-presets/${avatar_decoration_data.asset}.png`
    : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#0f3460] to-[#16213e] text-white font-[var(--font-family)] flex flex-col items-center overflow-x-hidden">
      {/* Top banner and header */}
      <header className="w-full flex flex-col items-center justify-center bg-[#232347dd] py-6 shadow-md" data-aos="fade-down">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20">
            <img
              src={avatarUrl}
              alt={username}
              className="w-20 h-20 rounded-full border-4 border-[#5865F2] shadow-lg object-cover"
            />
            {decorationUrl && (
              <img
                src={decorationUrl}
                alt="Decoration"
                className="absolute inset-0 w-20 h-20 rounded-full pointer-events-none opacity-90"
              />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {name || username}
              {verified ? (
                <BadgeCheck className="w-6 h-6 text-green-400" title="Verified" />
              ) : (
                <BadgeAlert className="w-6 h-6 text-yellow-400 animate-bounce" title="Unverified" />
              )}
            </h2>
            <span className="text-md text-neutral-400"> @{username} </span>
          </div>
        </div>
        <div className="flex gap-4 mt-5">
          {verified ? (
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-green-700/70 text-green-200 font-semibold" data-aos="zoom-in">
              <BadgeCheck className="w-5 h-5 mr-2" /> Verified
            </span>
          ) : (
            <a
              href="/verify"
              className="inline-flex items-center px-4 py-1 rounded-full bg-yellow-600/80 text-white font-semibold hover:bg-yellow-700 shadow transition"
              data-aos="zoom-in"
            >
              <BadgeAlert className="w-5 h-5 mr-2" /> Verify Account
            </a>
          )}

          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-1 rounded-full bg-red-500/80 text-white font-semibold hover:bg-red-600 shadow transition gap-2"
            data-aos="zoom-in"
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </header>

      {/* Info Cards Section */}
      <section className="w-full flex flex-col items-center justify-center mt-10 gap-7">
        {/* Server + Stats */}
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-4xl">
          <div className="flex flex-col bg-[#181826bb] p-6 rounded-2xl shadow-lg min-w-[270px] items-center" data-aos="fade-right">
            <Users className="w-8 h-8 text-indigo-400 mb-2" />
            <span className="font-bold text-2xl">2,500+</span>
            <span className="text-gray-400 text-xs">Total Members</span>
          </div>
          <div className="flex flex-col bg-[#181826bb] p-6 rounded-2xl shadow-lg min-w-[270px] items-center" data-aos="fade-up">
            <UserCheck className="w-8 h-8 text-green-400 mb-2" />
            <span className="font-bold text-2xl">1,200+</span>
            <span className="text-gray-400 text-xs">Verified Members</span>
          </div>
          <div className="flex flex-col bg-[#181826bb] p-6 rounded-2xl shadow-lg min-w-[270px] items-center" data-aos="fade-left">
            <Sparkles className="w-8 h-8 text-purple-400 mb-2" />
            <span className="font-bold text-2xl">Rewards + Perks</span>
            <span className="text-gray-400 text-xs">Exclusive Roles</span>
          </div>
        </div>

        {/* YouTube Channel Section */}
        <div className="flex flex-col bg-[#181826bb] rounded-2xl max-w-4xl w-full px-8 py-6 shadow-xl items-center" data-aos="zoom-in">
          <div className="flex items-center gap-4 mb-4">
            <Youtube className="w-6 h-6 text-red-500" />
            <span className="font-semibold text-lg">Dreamer's YouTube</span>
            <Crown className="w-5 h-5 text-purple-400 ml-2" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-7">
            <img
              src="https://yt3.ggpht.com/ytc/AKedOLRnTqvlWmRkgkQ2JtfWEYpKnM8sTfXZIHd6TDL=s88-c-k-c0x00ffffff-no-rj"
              className="rounded-full w-16 h-16 shadow-lg"
              alt="YouTube Channel"
            />
            <div>
              <span className="font-bold block text-xl">Dreamer's Land</span>
              <span className="block text-gray-400">115k+ subscribers</span>
            </div>
            <a
              href="https://www.youtube.com/@dreamersland"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md mt-2 transition hover:brightness-110"
            >
              <Youtube className="w-5 h-5" />
              Subscribe
            </a>
          </div>
          <span className="block mt-4 text-gray-500 text-xs">
            Subscribe to unlock exclusive Discord rewards!
          </span>
        </div>

        {/* Portal Actions Section */}
        <div className="flex flex-col bg-[#181826bb] py-6 px-10 rounded-2xl shadow-lg items-center max-w-4xl w-full" data-aos="fade-up">
          <div className="flex gap-5 mb-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow text-white font-bold hover:brightness-110"
            >
              <Home className="w-5 h-5" /> Home
            </a>
            <a
              href="https://ff-5d8.pages.dev/"
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-tr from-cyan-600 to-teal-600 rounded-xl shadow text-white font-bold hover:brightness-110"
            >
              <MessagesSquare className="w-5 h-5" /> Join Discord
            </a>
            <a
              href="/guide"
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-tr from-emerald-600 to-lime-600 rounded-xl shadow text-white font-bold hover:brightness-110"
            >
              <BookOpen className="w-5 h-5" /> Guide
            </a>
            <a
              href="/portal/privacy-policy"
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-tr from-gray-700 to-black rounded-xl shadow text-white font-bold hover:brightness-110"
            >
              <Shield className="w-5 h-5" /> Privacy
            </a>
          </div>
        </div>
      </section>

      <footer className="mt-10 mb-6 text-center text-sm text-gray-400" data-aos="fade-up">
        &copy; {new Date().getFullYear()} Dreamer's Land. All rights reserved.
      </footer>
    </main>
  );
}