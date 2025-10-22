import { useEffect, useState } from "react";
import { useInfoData } from "@/lib/info-data";
import { defaultGuildData } from "@/lib/default-data";
import { getLoginData, LoginData } from "@/lib/login";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileButton } from "@/components/user-profile";
import { YoutubeSection } from "@/components/youtube-section";
import { VerificationFooter } from "@/components/verification-footer";
import {
  Users,
  UserCheck,
  Home,
  MessagesSquare,
  BookOpen,
  Shield,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Discord } from "@/components/icons";
import { initializeAnimations, checkReducedMotion } from "@/lib/meta-utils";
import "aos/dist/aos.css";

export function VerificationPortal() {
  const { data, isLoading, error, isConnected, refetch } = useInfoData();
  const [loginData, setLoginData] = useState<LoginData | null>(getLoginData());

  useEffect(() => {
    // Initialize AOS animations
    if (!checkReducedMotion()) {
      initializeAnimations();
    }
  }, []);

  // Error state for failed data loading
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
            <Button
              onClick={() => refetch()}
              className="bg-neon-purple hover:bg-neon-purple/80 text-white w-full"
            >
              Try Again
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="border-dark-600 text-dark-300 hover:text-white w-full"
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isLoggedIn = !!loginData;
  const isVerified = loginData?.verified || false;

  return (
    <>
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-grain pointer-events-none"></div>

      {/* Main Content */}
      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-dark-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 transition-all duration-300 hover:scale-110">
                  <AvatarImage
                    src={data?.guild?.iconUrl || defaultGuildData.iconUrl}
                    alt="Server Icon"
                  />
                  <AvatarFallback>
                    {(data?.guild?.name || defaultGuildData.name).charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-bold text-white">
                  {data?.guild?.name || defaultGuildData.name}
                </h1>
              </div>

              {/* Right Side - Status & Profile */}
              <div className="flex items-center space-x-4">
                {/* Connection Status */}
                <div className="hidden sm:flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isConnected ? "bg-neon-emerald" : "bg-neon-orange"
                    }`}
                  />
                  <span className="text-xs text-dark-300">
                    {isConnected ? "Connected" : "Disconnected"}
                  </span>
                </div>

                {/* User Profile Button - only show when logged in */}
                {isLoggedIn && <UserProfileButton />}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 px-4 py-12">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6" data-aos="fade-down">
              {/* Server Icon */}
              <div className="flex justify-center mb-6">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 shadow-2xl ring-4 ring-neon-purple/30 hover:ring-neon-purple/50 transition-all duration-500 hover:scale-110">
                  <AvatarImage
                    src={data?.guild?.iconUrl || defaultGuildData.iconUrl}
                    alt="Server Icon"
                  />
                  <AvatarFallback className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-neon-purple to-neon-cyan text-white">
                    {(data?.guild?.name || defaultGuildData.name).charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Welcome to{" "}
                <span className="gradient-text">
                  {data?.guild?.name || defaultGuildData.name}
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
                Official verification portal for our Discord community.
                <br />
                <span className="text-neon-emerald font-semibold">
                  Verify your YouTube to unlock exclusive rewards!
                </span>
              </p>
            </div>

            {/* Server Statistics */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
              data-aos="fade-up"
            >
              {/* Total Members */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950/30 via-dark-800/40 to-dark-900/60 border border-cyan-900/30 p-6 backdrop-blur-md group hover:border-cyan-500/50 transition-all duration-300">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-cyan/10 rounded-full blur-3xl group-hover:bg-neon-cyan/20 transition-all duration-300"></div>
                <div className="relative flex items-center space-x-4">
                  <div className="p-4 bg-cyan-500/20 rounded-xl">
                    <Users className="w-10 h-10 text-neon-cyan" />
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-neon-cyan">
                      {data?.guild?.memberCountFormatted || defaultGuildData.memberCountFormatted}
                    </div>
                    <div className="text-dark-300 text-lg">Total Members</div>
                  </div>
                </div>
              </div>

              {/* Verified Members */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/30 via-dark-800/40 to-dark-900/60 border border-emerald-900/30 p-6 backdrop-blur-md group hover:border-emerald-500/50 transition-all duration-300">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-emerald/10 rounded-full blur-3xl group-hover:bg-neon-emerald/20 transition-all duration-300"></div>
                <div className="relative flex items-center space-x-4">
                  <div className="p-4 bg-emerald-500/20 rounded-xl">
                    <UserCheck className="w-10 h-10 text-neon-emerald" />
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-neon-emerald">
                      {data?.guild?.verifiedUserCountFormatted ||
                        defaultGuildData.verifiedUserCountFormatted}
                    </div>
                    <div className="text-dark-300 text-lg">Verified Members</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {!isLoggedIn ? (
                <>
                  {/* Login Button - Large and prominent */}
                  <a
                    href="https://discord-auth.pages.dev?to=/portal"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="lg"
                      className="w-full sm:min-w-[240px] bg-gradient-to-r from-neon-purple via-neon-pink to-neon-purple hover:from-neon-purple/80 hover:via-neon-pink/80 hover:to-neon-purple/80 text-white font-bold py-6 px-10 text-lg rounded-2xl shadow-2xl shadow-neon-purple/40 hover:shadow-neon-purple/60 transform hover:scale-105 transition-all duration-300 border-0"
                    >
                      <Discord className="w-6 h-6 mr-3" />
                      Login with Discord
                    </Button>
                  </a>
                  {/* Join Discord Button */}
                  <Button
                    size="lg"
                    className="w-full sm:min-w-[240px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-6 px-10 text-lg rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 border-0"
                    onClick={() =>
                      window.open("https://joindc.pages.dev", "_blank", "noopener,noreferrer")
                    }
                  >
                    <MessagesSquare className="w-6 h-6 mr-3" />
                    Join Discord
                  </Button>
                </>
              ) : (
                <>
                  {/* Show Verify Now button if logged in but not verified */}
                  {!isVerified && (
                    <a href="/verify/now" className="w-full sm:w-auto">
                      <Button
                        size="lg"
                        className="w-full sm:min-w-[240px] bg-gradient-to-r from-neon-purple via-neon-pink to-neon-purple hover:from-neon-purple/80 hover:via-neon-pink/80 hover:to-neon-purple/80 text-white font-bold py-6 px-10 text-lg rounded-2xl shadow-2xl shadow-neon-purple/40 hover:shadow-neon-purple/60 transform hover:scale-105 transition-all duration-300 border-0"
                      >
                        <CheckCircle2 className="w-6 h-6 mr-3" />
                        Verify Now
                      </Button>
                    </a>
                  )}
                  {/* hide if verified */}
                  {isVerified}
                </>
              )}

              {/* Homepage Button */}
              <a href="/" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:min-w-[200px] border-2 border-dark-600 text-dark-300 hover:text-white hover:border-neon-cyan hover:bg-neon-cyan/10 font-semibold py-6 px-8 text-lg rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/20"
                >
                  <Home className="w-5 h-5 mr-3" />
                  Homepage
                </Button>
              </a>
            </div>

            {/* How to Verify Section */}
            <div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950/20 via-dark-800/40 to-dark-900/60 border border-purple-900/30 backdrop-blur-md p-8 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-neon-purple mr-3" />
                  <h3 className="text-2xl md:text-3xl font-bold text-white">How to Verify?</h3>
                </div>
                <p className="text-dark-300 text-lg text-center mb-6 leading-relaxed">
                  Need help with verification? Check out our detailed guide or contact our
                  moderators on Discord for assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a href="/guide" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-dark-600 text-dark-300 hover:text-white hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Verification Guide
                    </Button>
                  </a>
                  <a href="/portal/privacy-policy" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-dark-600 text-dark-300 hover:text-white hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Privacy Policy
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* YouTube Section */}
            <YoutubeSection />
          </div>
        </div>

        {/* Footer */}
        <VerificationFooter />
      </main>
    </>
  );
}
