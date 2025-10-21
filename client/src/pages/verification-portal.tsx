import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { cn } from "@/lib/utils"; // If you use classnames helper. Remove otherwise.
import {
  Users, UserCheck, Home, MessagesSquare, Youtube,
  BookOpen, Shield, Sparkles, Crown, LogOut, BadgeCheck, BadgeAlert
} from "lucide-react";
import { discord } from "@/components/icons";
import { getLoginData, isLoggedIn, logout } from "@/lib/login";
import { useInfoData } from "@/lib/info-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/*
 * Portal allows all users (logged in or not) to see full info.
 * Only user profile&actions are gated by login.
 */

export function VerificationPortal() {
  // Fetching community info and YouTube data
  const {
    data,
    isLoading: loadingInfo,
    error,
    isConnected,
    refetch,
  } = useInfoData();

  // Login user data (from localStorage)
  const [userData, setUserData] = useState(getLoginData());
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    setUserData(getLoginData());
    setLoadingUser(false);
  }, []);

  // Logout action
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      setUserData(null);
    }
  };

  // Error/Loading screen
  if ((loadingInfo && !data) || loadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-950 text-white font-[var(--font-family)]">
        <Shield className="w-8 h-8 mr-2 animate-spin text-indigo-400" />
        Loading Portal...
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-6">
            <Shield className="w-16 h-16 text-neon-orange mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Portal Unavailable</h1>
            <p className="text-dark-300 mb-4">
              We're having trouble loading the verification portal. Please try again later.
            </p>
          </div>
          <div className="space-y-3">
            <Button onClick={() => refetch()} className="bg-neon-purple hover:bg-neon-purple/80 text-white w-full">
              Try Again
            </Button>
            <Button onClick={() => window.location.href = '/'} variant="outline" className="border-dark-600 text-dark-300 hover:text-white w-full">
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Data fallback
  const guild = data?.guild;
  const youtube = data?.youtube;
  // Default values e.g. in defaultGuildData/defaultYoutubeData if needed

  return (
    <>
      {/* BG */}
      <div className="fixed inset-0 bg-grain pointer-events-none z-0" />

      {/* Main Portal */}
      <main data-testid="portal-main" className="min-h-screen flex flex-col">
        {/* Header */}
        <header
          className="sticky top-0 z-40 border-b border-white/10 bg-dark-950/80 backdrop-blur"
          data-aos="fade-down"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8 transition-all" data-testid="img-server-logo">
                  <AvatarImage src={guild?.iconUrl} alt="Server Icon" />
                  <AvatarFallback>{(guild?.name || "D").charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-bold text-white" data-testid="text-server-name">
                  {guild?.name ?? "Dreamer's Land"}
                </h1>
              </div>
              {/* Status Indicator */}
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-neon-emerald" : "bg-neon-orange"}`} />
                <span className="text-xs text-dark-300">{isConnected ? "Connected" : "Disconnected"}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Profile Banner, only if logged in */}
        {isLoggedIn() && userData && (
          <section
            className="flex flex-col items-center pt-12 pb-6 bg-gradient-to-b from-dark-950/90 to-transparent"
            data-aos="fade-up"
          >
            <div className="relative w-32 h-32 mb-4 flex justify-center">
              <Avatar className="w-32 h-32 ring-4 ring-indigo-600 transition-all duration-500">
                <AvatarImage src={`https://cdn.discordapp.com/avatars/${userData.userid}/${userData.avatar}.webp?size=256`} />
                <AvatarFallback>{(userData.name || userData.username || "U").charAt(0)}</AvatarFallback>
              </Avatar>
              {userData.avatar_decoration_data && (
                <img
                  src={`https://cdn.discordapp.com/avatar-decoration-presets/${userData.avatar_decoration_data.asset}.png`}
                  alt="Decoration"
                  className="absolute inset-0 w-32 h-32 object-cover pointer-events-none opacity-90"
                  draggable={false}
                />
              )}
            </div>
            <h2 className="text-3xl font-semibold flex items-center gap-2" data-aos="fade-down">
              {userData.name || userData.username}
              {userData.verified ? (
                <BadgeCheck className="inline w-6 h-6 text-green-400" />
              ) : (
                <BadgeAlert className="inline w-6 h-6 text-yellow-400 animate-bounce" />
              )}
            </h2>
            <div className="text-md text-neutral-400 mb-3">@{userData.username}</div>
            <div className="flex gap-3 items-center">
              {userData.verified ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-700/70 text-green-200 font-medium" data-aos="zoom-in">
                  <BadgeCheck className="w-4 h-4 mr-1" /> Verified
                </span>
              ) : (
                <a href="/verify"
                  className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-600/80 text-white font-medium hover:bg-yellow-700 shadow transition"
                  data-aos="zoom-in"
                >
                  <BadgeAlert className="w-4 h-4 mr-1" /> Verify Account
                </a>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/80 text-white font-medium hover:bg-red-600 shadow transition"
                data-aos="zoom-in"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </section>
        )}

        {/* Main Portal Content */}
        <div className="flex-1 flex justify-center items-start px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            {/* Welcome & Actions */}
            <Card className="md:col-span-2 bg-dark-800/40 border-dark-600 backdrop-blur-md" data-aos="fade-right">
              <CardContent className="p-8">
                {/* Big Server Icon */}
                <div className="mb-6 flex flex-col items-center">
                  <Avatar className="w-20 h-20 mx-auto shadow-lg ring-2 ring-neon-purple/30 transition-all" data-testid="img-server-icon-large">
                    <AvatarImage src={guild?.iconUrl} alt="Server Icon" />
                    <AvatarFallback className="text-2xl">{(guild?.name || "DL").charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl md:text-3xl mt-4 font-bold text-white" data-testid="text-welcome-title">
                    Welcome to <span className="gradient-text">{guild?.name}</span> Verification Portal
                  </h3>
                  <p className="text-dark-300 text-lg my-5 leading-relaxed">
                    {guild?.desc || "This is your community’s official verification portal. To access exclusive rewards, please verify your Discord and YouTube accounts."}
                  </p>
                </div>
                {/* STATS row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <Card className="bg-dark-700/50 border-dark-600">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Users className="w-8 h-8 text-neon-cyan" />
                        <div>
                          <div className="text-2xl font-bold text-neon-cyan transition-all" data-testid="text-member-count">
                            {guild?.memberCountFormatted}
                          </div>
                          <div className="text-dark-300 text-sm">Total Members</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-dark-700/50 border-dark-600">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <UserCheck className="w-8 h-8 text-neon-emerald" />
                        <div>
                          <div className="text-2xl font-bold text-neon-emerald transition-all" data-testid="text-verified-count">
                            {guild?.verifiedUserCountFormatted}
                          </div>
                          <div className="text-dark-300 text-sm">Verified Members</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {/* Main Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4" data-aos="zoom-in">
                  <Button 
                    className="w-full sm:min-w-[200px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 active:scale-95 border-0 text-base md:text-lg"
                    onClick={() => window.open('https://joindc.pages.dev', '_blank', 'noopener,noreferrer')}
                  >
                    <MessagesSquare className="w-5 h-5 mr-2" />
                    Join Discord
                  </Button>
                  <a href="/" className="block w-full sm:w-auto">
                    <Button 
                      variant="outline"
                      className="w-full sm:min-w-[200px] border-2 border-gray-600 text-gray-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 font-semibold py-4 px-8 rounded-2xl text-base md:text-lg"
                    >
                      <Home className="w-5 h-5 mr-2" />
                      Go to Homepage
                    </Button>
                  </a>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm mt-8 pt-6 border-t border-white/10">
                  <a href="/guide" className="text-dark-400 hover:text-white transition-colors inline-flex items-center cursor-help">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Verification Guide
                  </a>
                  <a href="/portal/privacy-policy" className="text-dark-400 hover:text-white transition-colors inline-flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy Policy
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* YouTube & How To */}
            <div className="flex flex-col gap-8" data-aos="fade-left">
              {/* How to Verify Section */}
              <Card className="bg-dark-800/40 border-dark-600 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-neon-purple mr-2" />
                    <h3 className="text-xl font-semibold text-white">How to Verify?</h3>
                  </div>
                  <p className="text-dark-300 mb-4">
                    Visit the{" "}
                    <a href="/guide" className="text-neon-emerald font-semibold hover:text-neon-emerald/80 hover:underline transition cursor-help">
                      Verification Guide
                    </a>{" "}
                    if you need help.<br />
                    Contact Moderators anytime on Discord.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="/guide">
                      <Button variant="outline" className="border-dark-600 text-dark-300 hover:text-white cursor-help">
                        <BookOpen className="w-4 h-4 mr-2" />
                        How to Verify
                      </Button>
                    </a>
                    <a href="/">
                      <Button variant="ghost" className="text-dark-300 hover:text-white">
                        <Home className="w-4 h-4 mr-2" />
                        Visit Homepage
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
              {/* YouTube Section */}
              <Card className="bg-dark-800/40 border-dark-600 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <Youtube className="w-6 h-6 text-red-500 mr-2" />
                    <h3 className="text-xl font-semibold text-white">YouTube Channel</h3>
                  </div>
                  {youtube ? (
                    <div className="flex flex-wrap items-center gap-6">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={youtube.logoUrl} alt="YouTube Channel" />
                        <AvatarFallback>
                          <Youtube className="w-8 h-8 text-red-500" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-[120px] text-left">
                        <h4 className="text-lg font-semibold text-white">
                          {youtube.channelTitle}
                        </h4>
                        <p className="text-dark-300">
                          {youtube.subscriberCountFormatted
                            ? `${youtube.subscriberCountFormatted} subs`
                            : "NA"}
                        </p>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 shrink-0"
                        onClick={() =>
                          window.open(youtube.channelUrl, "_blank", "noopener,noreferrer")
                        }
                      >
                        <Youtube className="w-4 h-4 mr-2" />
                        Subscribe
                      </Button>
                    </div>
                  ) : (
                    <p className="text-dark-400">YouTube channel information unavailable</p>
                  )}
                  <p className="text-dark-400 text-sm mt-4 text-center">
                    <Crown className="w-4 h-4 inline-block mr-1 text-neon-purple" />
                    Subscribe to unlock exclusive Discord rewards!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Login bar (for login if not logged in) */}
        {!isLoggedIn() && (
          <div className="fixed bottom-0 right-0 left-0 z-40 flex justify-center bg-dark-950/70 py-6 md:py-4 shadow-inner" data-aos="fade-up">
            <a
              href="https://discord-auth.pages.dev?to=/portal"
              className="flex items-center gap-3 bg-[#5865F2] hover:bg-[#404eed] px-7 py-3 rounded-2xl shadow-lg text-white font-bold text-lg transition"
            >
              {discord && discord({ className: "w-6 h-6" })}
              Login with Discord
            </a>
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-white/10 bg-dark-950/80 backdrop-blur-md" data-testid="portal-footer">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                {guild?.iconUrl && (
                  <Avatar className="w-6 h-6" data-testid="img-footer-logo">
                    <AvatarImage src={guild.iconUrl} alt="Server Icon" />
                    <AvatarFallback>{guild.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <span className="text-dark-400 text-sm">
                  © {new Date().getFullYear()} {guild?.name || "Dreamer's Land"}
                </span>
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="/" className="text-dark-400 hover:text-white transition-colors">
                  Homepage
                </a>
                <a href="/guide" className="text-dark-400 hover:text-white transition-colors cursor-help">
                  Guide
                </a>
                <a href="/portal/privacy-policy" className="text-dark-400 hover:text-white transition-colors cursor-help">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}