import { useInfoData } from "@/lib/info-data";
import { defaultYoutubeData } from "@/lib/default-data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Youtube, Crown } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";

export function YoutubeSection() {
  const { data } = useInfoData();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  const youtubeData = data?.youtube || defaultYoutubeData;

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950/20 via-dark-800/40 to-dark-900/60 border border-red-900/20 backdrop-blur-md p-8"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      {/* Background glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6" data-aos="fade-down">
          <Youtube className="w-8 h-8 text-red-500 mr-3" />
          <h3 className="text-2xl md:text-3xl font-bold text-white">YouTube Channel</h3>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          {/* YouTube Avatar */}
          <div data-aos="zoom-in" data-aos-delay="100">
            <Avatar className="w-24 h-24 md:w-28 md:h-28 ring-4 ring-red-500/30 shadow-2xl shadow-red-500/20">
              <AvatarImage src={youtubeData.logoUrl} alt={youtubeData.channelTitle} />
              <AvatarFallback className="bg-red-600 text-white text-2xl">
                <Youtube className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Channel Info */}
          <div className="flex-1 text-center md:text-left" data-aos="fade-left" data-aos-delay="150">
            <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {youtubeData.channelTitle}
            </h4>
            <p className="text-lg text-dark-300 mb-1">{youtubeData.customUsername}</p>
            {youtubeData.subscriberCountFormatted && youtubeData.subscriberCountFormatted !== "NA" && (
              <p className="text-xl font-semibold text-red-400">
                {youtubeData.subscriberCountFormatted} subscribers
              </p>
            )}
          </div>

          {/* Subscribe Button */}
          <div data-aos="fade-left" data-aos-delay="200">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold px-8 py-6 text-lg shadow-xl shadow-red-500/30 hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 border-0"
              onClick={() => window.open(youtubeData.channelUrl, "_blank", "noopener,noreferrer")}
            >
              <Youtube className="w-6 h-6 mr-3" />
              Subscribe
            </Button>
          </div>
        </div>

        {/* Call to action */}
        <p
          className="text-center text-dark-300 text-base md:text-lg"
          data-aos="fade-up"
          data-aos-delay="250"
        >
          <Crown className="w-5 h-5 inline-block mr-2 text-neon-purple" />
          Subscribe to unlock exclusive Discord rewards!
        </p>
      </div>
    </div>
  );
}
