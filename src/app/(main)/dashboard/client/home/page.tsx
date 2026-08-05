import Image from "next/image";

import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config/app-config";
import initTranslations from "@/lib/i18n";

export default async function Home(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const { t } = await initTranslations(locale, ["common"]);

  // Contact email - you can add this to APP_CONFIG if needed
  const contactEmail = "contact@leajlak.com";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border bg-background shadow-sm">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/backgrounds/home_background.png"
          alt="Home Background"
          fill
          className="object-cover object-[center_top]"
          priority
          sizes="100vw"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-12">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Welcome Message */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground drop-shadow-2xl">
              {t("home_page.welcome_title")}{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {t("home_page.welcome_brand")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/90 drop-shadow-md max-w-2xl balance whitespace-pre-wrap">
              {t("home_page.welcome_description")}
            </p>
          </div>

          {/* Contact Button */}
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden shadow-xl transition-all duration-300 px-8 py-6 text-lg hover:shadow-2xl hover:-translate-y-1"
            >
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-3"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>{t("home_page.contact_us")}</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
