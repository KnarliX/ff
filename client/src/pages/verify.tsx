import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { fetchVerifyData, getOAuth2StartUrl, VerifyData } from "@/lib/verify";
import { VerifyComponent } from "@/components/verify";
import { Loader2 } from "lucide-react";
import "@/styles/fonts.css";
import "@/styles/index.css";

function VerifyPage() {
  const [loading, setLoading] = useState(true);
  const [verifyData, setVerifyData] = useState<VerifyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      window.location.href = '/verify/now';
      return;
    }

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
    return null;
  }

  if (!verifyData) {
    return null;
  }

  return (
    <VerifyComponent
      displayName={verifyData.displayName}
      username={verifyData.username}
      discordId={verifyData.discordId}
      avatar={verifyData.avatar}
      onConnectYouTube={handleConnectYouTube}
    />
  );
}

createRoot(document.getElementById("root")!).render(<VerifyPage />);
