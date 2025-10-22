import { useInfoData } from "@/lib/info-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function VerificationFooter() {
  const { data } = useInfoData();

  return (
    <footer className="border-t border-white/10 bg-dark-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {data?.guild?.iconUrl && (
              <Avatar className="w-6 h-6">
                <AvatarImage src={data.guild.iconUrl} alt="Server Icon" />
                <AvatarFallback>{data.guild.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <span className="text-dark-400 text-sm">
              © 2025 {data?.guild?.name || "Dreamer's Land"}. All rights reserved.
            </span>
          </div>
          <div className="flex space-x-6 text-sm">
            <a
              href="/"
              className="text-dark-400 hover:text-white transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/guide"
              className="text-dark-400 hover:text-white transition-colors duration-200"
            >
              Guide
            </a>
            <a
              href="/portal/privacy-policy"
              className="text-dark-400 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
