import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Youtube, ArrowLeft, CheckCircle2, Shield } from "lucide-react";

export interface VerifyComponentProps {
  token: string;
  displayName: string;
  username: string;
  discordId: string;
  avatar: string;
  onConnectYouTube: () => void;
  backUrl?: string;
}

export function VerifyComponent({
  token,
  displayName,
  username,
  discordId,
  avatar,
  onConnectYouTube,
  backUrl = "/portal"
}: VerifyComponentProps) {
  const avatarUrl = `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.webp?size=256`;

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-grain pointer-events-none"></div>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-dark-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <a
              href={backUrl}
              className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-xs sm:text-sm font-medium">Back to Portal</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - User Profile */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              {/* Avatar with Glow */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-neon-purple to-red-500 rounded-full opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-300"></div>
                <Avatar className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 ring-4 ring-neon-purple/30 shadow-2xl">
                  <AvatarImage src={avatarUrl} alt={displayName} />
                  <AvatarFallback className="bg-gradient-to-br from-neon-purple to-purple-600 text-white text-4xl sm:text-5xl font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* User Info */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  {displayName}
                </h1>
                <p className="text-base sm:text-lg text-dark-300">@{username}</p>
                <p className="text-xs sm:text-sm text-dark-400 font-mono">
                  ID: {discordId}
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-900/50 border border-purple-900/30 rounded-full">
                <Shield className="w-4 h-4 text-neon-purple" />
                <span className="text-xs sm:text-sm text-dark-300 font-medium">
                  Pending Verification
                </span>
              </div>
            </div>

            {/* Right Side - Verification Card */}
            <div className="space-y-6">
              {/* Title Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-12 bg-gradient-to-b from-neon-purple to-red-500 rounded-full"></div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      YouTube Verification
                    </h2>
                    <p className="text-sm sm:text-base text-dark-400 mt-1">
                      Connect your account to continue
                    </p>
                  </div>
                </div>
              </div>

              {/* Instructions Card */}
              <div className="bg-dark-900/30 backdrop-blur-sm border border-purple-900/20 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-neon-purple text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-dark-200">
                      Click the button below to connect with YouTube
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-neon-purple text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-dark-200">
                      Authorize access through Google OAuth
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-neon-purple text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-dark-200">
                      Get instant Discord roles and access
                    </p>
                  </div>
                </div>
              </div>

              {/* Connect Button */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  onClick={onConnectYouTube}
                  className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:via-red-400 hover:to-red-500 text-white font-bold px-8 py-6 sm:py-7 text-base sm:text-lg rounded-xl shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border-0 group"
                >
                  <Youtube className="w-5 h-5 sm:w-6 sm:h-6 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Connect with YouTube
                </Button>
                
                {/* Privacy Policy Agreement */}
                <p className="text-xs text-center text-dark-400">
                  By clicking this button, you agree to our{" "}
                  <a 
                    href="/privacy-policy" 
                    className="text-neon-purple hover:text-purple-400 underline transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>

              {/* Info Note */}
              <div className="flex items-start gap-3 p-4 bg-neon-purple/5 border border-neon-purple/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-neon-purple flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-dark-300 leading-relaxed">
                  After connecting, we'll verify your subscription status and automatically grant you exclusive Discord roles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
