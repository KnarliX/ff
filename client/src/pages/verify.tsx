import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { fetchVerifyData, getOAuth2StartUrl, VerifyData } from "@/lib/verify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Youtube, Loader2, ArrowLeft, Shield } from "lucide-react";
import "@/styles/fonts.css";
import "@/styles/index.css";

function VerifyPage() {
  const [loading, setLoading] = useState(true);
  const [verifyData, setVerifyData] = useState<VerifyData | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // If no token, redirect to /verify/now
    if (!token) {
      window.location.href = '/verify/now';
      return;
    }

    // Fetch verification data
    fetchVerifyData(token)
      .then((data) => {
        setVerifyData(data);
        setLoading(false);
      })
      .catch((err) => {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred';
        window.location.href = `/error?msg=${encodeURIComponent(errorMsg)}`;
      });
  }, []);

  const handleConnectYouTube = () => {
    if (verifyData) {
      window.location.href = getOAuth2StartUrl(verifyData.token);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <div className="fixed inset-0 bg-grain pointer-events-none"></div>
        <div className="text-center relative z-10">
          <Loader2 className="w-12 h-12 text-neon-purple mx-auto mb-4 animate-spin" />
          <p className="text-dark-300 text-lg">Verifying your token...</p>
        </div>
      </div>
    );
  }

  if (!verifyData) {
    return null;
  }

  const avatarUrl = `https://cdn.discordapp.com/avatars/${verifyData.discordId}/${verifyData.avatar}.webp?size=256`;

  return (
    <>
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-grain pointer-events-none"></div>

      {/* Main Content */}
      <main className="min-h-screen flex flex-col relative">
        {/* Header */}
        <header className="border-b border-white/10 bg-dark-950/80 backdrop-blur-md relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a
                href="/portal"
                className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Portal</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
          <div className="max-w-4xl w-full">
            {/* Title Section */}
            <div className="text-center mb-12" data-aos="fade-down">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-2xl shadow-red-500/30">
                  <Youtube className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                YouTube <span className="gradient-text">Verification</span>
              </h1>
              <p className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto">
                Connect your YouTube account to complete verification and unlock exclusive Discord roles
              </p>
            </div>

            {/* User Profile Card - Glassmorphism style */}
            <div className="mb-8" data-aos="zoom-in" data-aos-delay="100">
              <div className="relative overflow-hidden rounded-3xl bg-dark-800/30 border border-dark-600/50 backdrop-blur-md p-8 md:p-10 hover:border-neon-purple/30 transition-all duration-300">
                <div className="flex flex-col items-center space-y-6">
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-neon-purple/30 shadow-2xl shadow-neon-purple/20 transition-all duration-300 hover:ring-neon-purple/50 hover:scale-105">
                      <AvatarImage src={avatarUrl} alt={verifyData.displayName} />
                      <AvatarFallback className="bg-neon-purple text-white text-4xl font-bold">
                        {verifyData.displayName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* User Info */}
                  <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {verifyData.displayName}
                    </h2>
                    <p className="text-dark-300 text-xl mb-2">@{verifyData.discordTag}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-900/50 rounded-full border border-dark-600">
                      <Shield className="w-4 h-4 text-neon-purple" />
                      <span className="text-dark-400 text-sm font-mono">{verifyData.discordId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connect Button Section */}
            <div className="text-center space-y-6" data-aos="fade-up" data-aos-delay="200">
              <Button
                size="lg"
                onClick={handleConnectYouTube}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold px-16 py-8 text-xl rounded-2xl shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 transform hover:scale-105 transition-all duration-300 border-0"
              >
                <Youtube className="w-7 h-7 mr-3" />
                Connect with YouTube
              </Button>

              {/* Info Text */}
              <div className="max-w-2xl mx-auto">
                <p className="text-dark-400 text-sm">
                  You'll be redirected to Google to authorize access to your YouTube account
                </p>
              </div>
            </div>

            {/* Info Box at bottom */}
            <div className="mt-12 bg-gradient-to-r from-neon-purple/10 to-neon-pink/10 border border-neon-purple/20 rounded-2xl p-6" data-aos="fade-up" data-aos-delay="300">
              <p className="text-dark-300 text-center text-sm md:text-base">
                <span className="text-neon-purple font-semibold">✨ What happens next?</span>
                <br className="mb-2" />
                After connecting, we'll verify your YouTube subscription status and grant you
                exclusive Discord roles automatically.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<VerifyPage />);
