import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { fetchVerifyData, getOAuth2StartUrl, VerifyData } from "@/lib/verify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Youtube, Loader2, ArrowLeft } from "lucide-react";
import "@/styles/fonts.css";
import "@/styles/index.css";

function VerifyPage() {
  const [loading, setLoading] = useState(true);
  const [verifyData, setVerifyData] = useState<VerifyData | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-neon-purple mx-auto mb-4 animate-spin" />
          <p className="text-dark-300 text-lg">Verifying your token...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Will redirect to error page
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
      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-white/10 bg-dark-950/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl w-full">
            {/* Verification Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950/30 via-dark-800/50 to-dark-900/60 border border-purple-900/30 backdrop-blur-md p-8 md:p-12">
              {/* Background glow effects */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 space-y-8">
                {/* Title */}
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    YouTube Verification
                  </h1>
                  <p className="text-dark-300 text-lg">
                    Connect your YouTube account to complete verification
                  </p>
                </div>

                {/* User Profile Section */}
                <div className="flex flex-col items-center space-y-6 py-6">
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar className="w-28 h-28 md:w-32 md:h-32 ring-4 ring-neon-purple/30 shadow-2xl shadow-neon-purple/20">
                      <AvatarImage src={avatarUrl} alt={verifyData.displayName} />
                      <AvatarFallback className="bg-neon-purple text-white text-3xl font-bold">
                        {verifyData.displayName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* User Info */}
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {verifyData.displayName}
                    </h2>
                    <p className="text-dark-300 text-lg mb-1">@{verifyData.discordTag}</p>
                    <p className="text-dark-400 text-sm font-mono">ID: {verifyData.discordId}</p>
                  </div>

                  {/* Divider */}
                  <div className="w-full border-t border-dark-600"></div>

                  {/* Instructions */}
                  <div className="text-center space-y-3">
                    <p className="text-dark-300">
                      Click the button below to connect your YouTube account
                    </p>
                    <p className="text-sm text-dark-400">
                      You'll be redirected to Google to authorize access
                    </p>
                  </div>

                  {/* Connect Button */}
                  <Button
                    size="lg"
                    onClick={handleConnectYouTube}
                    className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold px-12 py-6 text-lg rounded-2xl shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 transform hover:scale-105 transition-all duration-300 border-0"
                  >
                    <Youtube className="w-6 h-6 mr-3" />
                    Connect with YouTube
                  </Button>
                </div>

                {/* Info Box */}
                <div className="bg-dark-900/50 border border-dark-700 rounded-xl p-4">
                  <p className="text-sm text-dark-300 text-center">
                    <span className="text-neon-purple font-semibold">Note:</span> After
                    connecting, we'll verify your YouTube subscription status and grant you
                    exclusive Discord roles automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<VerifyPage />);
