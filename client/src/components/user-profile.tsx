import { useState, useEffect, useRef } from "react";
import { getLoginData, logout, LoginData } from "@/lib/login";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, LogOut, BadgeCheck, BadgeAlert, X } from "lucide-react";

interface UserProfilePopupProps {
  loginData: LoginData;
  onLogout: () => void;
}

function UserProfilePopup({ loginData, onLogout }: UserProfilePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const confirmDialogRef = useRef<HTMLDivElement>(null);

  const avatarUrl = `https://cdn.discordapp.com/avatars/${loginData.userid}/${loginData.avatar}.webp?size=256`;
  const decorationUrl = loginData.avatar_decoration_data
    ? `https://cdn.discordapp.com/avatar-decoration-presets/${loginData.avatar_decoration_data.asset}.png`
    : null;

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    onLogout();
    window.location.reload();
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutsidePopup = popupRef.current && !popupRef.current.contains(event.target as Node);
      const clickedOutsideDialog = confirmDialogRef.current && !confirmDialogRef.current.contains(event.target as Node);
      
      // Only close if clicked outside both popup and confirmation dialog
      if (clickedOutsidePopup && clickedOutsideDialog) {
        setIsOpen(false);
        setShowLogoutConfirm(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* User Avatar Button */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative focus:outline-none focus:ring-2 focus:ring-neon-purple rounded-full transition-all duration-300 hover:scale-110"
        >
          <div className="relative w-12 h-12">
            <Avatar className="w-12 h-12 ring-2 ring-neon-purple/50 hover:ring-neon-purple transition-all duration-300">
              <AvatarImage src={avatarUrl} alt={loginData.username} />
              <AvatarFallback className="bg-neon-purple text-white font-bold">
                {loginData.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {decorationUrl && (
              <img
                src={decorationUrl}
                alt="Avatar Decoration"
                loading="lazy"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transform: "scale(1.2)" }}
              />
            )}
          </div>
        </button>

        {/* Tooltip on hover */}
        <div className="absolute right-0 top-full mt-2 px-3 py-1 bg-dark-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          @{loginData.username}
        </div>
      </div>

      {/* Backdrop overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300" />
      )}

      {/* Profile Popup */}
      {isOpen && (
        <div
          ref={popupRef}
          className="fixed top-20 right-4 w-96 max-w-[calc(100vw-2rem)] bg-dark-800 border-2 border-dark-600 rounded-2xl shadow-2xl shadow-black/50 z-50 animate-in slide-in-from-right duration-300"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-dark-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-28 h-28 mb-4">
                <Avatar className="w-28 h-28 ring-4 ring-neon-purple/30">
                  <AvatarImage src={avatarUrl} alt={loginData.username} />
                  <AvatarFallback className="bg-neon-purple text-white text-3xl font-bold">
                    {loginData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {decorationUrl && (
                  <img
                    src={decorationUrl}
                    alt="Avatar Decoration"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ transform: "scale(1.3)" }}
                  />
                )}
              </div>

              {/* Name & Username */}
              <h3 className="text-2xl font-bold text-white mb-1">{loginData.name}</h3>
              <p className="text-dark-300 text-lg mb-3">@{loginData.username}</p>

              {/* Verification Status */}
              <div className="flex items-center gap-2 mb-4">
                {loginData.verified ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                    <BadgeCheck className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full">
                    <BadgeAlert className="w-5 h-5 text-orange-400" />
                    <span className="text-orange-400 font-semibold">Not Verified</span>
                  </div>
                )}
              </div>

              {/* Verify Button - only show if not verified */}
              {!loginData.verified && (
                <a href="/verify/now" className="w-full mb-4">
                  <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-purple/80 hover:to-neon-pink/80 text-white font-bold py-3 shadow-lg shadow-neon-purple/30">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Verify Now
                  </Button>
                </a>
              )}

              {/* User ID & Auth Date */}
              <div className="w-full bg-dark-900/50 rounded-lg p-4 mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-400">User ID:</span>
                  <span className="text-dark-200 font-mono">{loginData.userid}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-400">Logged in:</span>
                  <span className="text-dark-200">
                    {new Date(loginData.authAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500 transition-all duration-200"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div ref={confirmDialogRef} className="bg-dark-800 border-2 border-dark-600 rounded-2xl shadow-2xl shadow-black/50 max-w-md w-full p-6 animate-in zoom-in-95 duration-200 mx-auto my-auto">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center">
                <LogOut className="w-8 h-8 text-red-400" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white text-center mb-2">
              Confirm Logout
            </h3>

            {/* Description */}
            <p className="text-dark-300 text-center mb-6">
              Are you sure you want to logout? You'll need to login again to access your profile.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={cancelLogout}
                variant="outline"
                className="flex-1 border-dark-600 text-dark-300 hover:text-white hover:border-dark-500 hover:bg-dark-700 transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmLogout}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold shadow-lg shadow-red-500/30 transition-all duration-200"
              >
                Yes, Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function UserProfileButton() {
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  useEffect(() => {
    // Check login status on mount
    const data = getLoginData();
    setLoginData(data);
  }, []);

  const handleLogout = () => {
    logout();
    setLoginData(null);
    window.location.reload();
  };

  if (!loginData) {
    return null;
  }

  return <UserProfilePopup loginData={loginData} onLogout={handleLogout} />;
}