import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getLoginData, updateVerificationStatus } from "@/lib/login";
import { generateToken, getTokenFromCookie, setTokenCookie } from "@/lib/token-generate";
import { VerifyComponent } from "@/components/verify";
import { getOAuth2StartUrl } from "@/lib/verify";
import { Loader2 } from "lucide-react";
import "@/styles/fonts.css";
import "@/styles/index.css";

type PageState = 'loading' | 'not_logged_in' | 'already_verified' | 'generating_token' | 'show_verify';

function VerifyNowPage() {
  const [pageState, setPageState] = useState<PageState>('loading');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loginData = getLoginData();

    if (!loginData) {
      setPageState('not_logged_in');
      return;
    }

    if (loginData.verified) {
      setPageState('already_verified');
      return;
    }

    const existingToken = getTokenFromCookie();
    if (existingToken) {
      setToken(existingToken);
      setPageState('show_verify');
      return;
    }

    setPageState('generating_token');

    generateToken(loginData.userid.toString(), loginData.username)
      .then((response) => {
        if (response.error) {
          window.location.href = `/error?msg=${encodeURIComponent(response.error)}`;
          return;
        }

        if (response.verified) {
          updateVerificationStatus(true);
          setPageState('already_verified');
          return;
        }

        if (response.token) {
          setTokenCookie(response.token);
          setToken(response.token);
          setPageState('show_verify');
          return;
        }

        window.location.href = `/error?msg=${encodeURIComponent('Invalid response from server')}`;
      })
      .catch(() => {
        window.location.href = `/error?msg=${encodeURIComponent('Service temporarily unavailable')}`;
      });
  }, []);

  const handleConnectYouTube = () => {
    if (token) {
      window.location.href = getOAuth2StartUrl(token);
    }
  };

  const handleUnderstandNotLoggedIn = () => {
    window.location.href = 'https://auth.dreamer.jarvibeta.xyz?goto=/portal';
  };

  const handleUnderstandAlreadyVerified = () => {
    window.location.href = '/portal';
  };

  if (pageState === 'loading' || pageState === 'generating_token') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-neon-purple mx-auto mb-4 animate-spin" />
          <p className="text-dark-300 text-lg">
            {pageState === 'loading' ? 'Loading...' : 'Generating verification token...'}
          </p>
        </div>
      </div>
    );
  }

  if (pageState === 'not_logged_in') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950 relative overflow-hidden">
        <div className="fixed inset-0 bg-grain pointer-events-none"></div>
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-dark-900/50 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-8 shadow-2xl">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Login Required</h2>
                <p className="text-dark-300 text-sm">
                  You need to be logged in to access the verification portal.
                </p>
              </div>

              <button
                onClick={handleUnderstandNotLoggedIn}
                className="w-full bg-gradient-to-r from-neon-purple to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/30"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pageState === 'already_verified') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950 relative overflow-hidden">
        <div className="fixed inset-0 bg-grain pointer-events-none"></div>
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-dark-900/50 backdrop-blur-xl border border-green-900/30 rounded-2xl p-8 shadow-2xl">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Already Verified</h2>
                <p className="text-dark-300 text-sm">
                  You are already verified! You have access to all exclusive Discord roles and perks.
                </p>
              </div>

              <button
                onClick={handleUnderstandAlreadyVerified}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/30"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pageState === 'show_verify' && token) {
    const loginData = getLoginData();
    if (!loginData) {
      window.location.href = '/error?msg=Session expired';
      return null;
    }

    return (
      <VerifyComponent
        token={token}
        displayName={loginData.name}
        username={loginData.username}
        discordId={loginData.userid.toString()}
        avatar={loginData.avatar}
        onConnectYouTube={handleConnectYouTube}
        backUrl="/portal"
      />
    );
  }

  return null;
}

createRoot(document.getElementById("root")!).render(<VerifyNowPage />);
