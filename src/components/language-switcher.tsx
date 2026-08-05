"use client";

import * as React from "react";

import { usePathname, useRouter } from "next/navigation";

import { Check, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { i18nConfig } from "@/i18n-config";

// Language configuration with flags and display names
const languageConfig = {
  en: { flag: "🇬🇧", name: "English" },
  ar: { flag: "🇸🇦", name: "العربية" },
} as const;

// Utility function to set cookie
function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/`;
}

export default function LanguageSwitcher() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const { i18n } = useTranslation();
  const currentLocale = i18n.language as keyof typeof languageConfig;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Set cookie for next-i18n-router
    setCookie("NEXT_LOCALE", newLocale, 30);

    // Redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
      );
    }

    router.refresh();
  };

  // eslint-disable-next-line security/detect-object-injection
  const currentLanguage = languageConfig[currentLocale] || languageConfig.en;

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="group relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm"
      >
        <Globe className="mr-2 h-4 w-4" />
        <span className="flex items-center gap-2">
          <span className="hidden font-medium sm:inline-block">Language</span>
        </span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="group relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-background/80 hover:shadow-lg hover:shadow-primary/5"
        >
          <Globe className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          <span className="flex items-center gap-2">
            <span className="text-lg leading-none">{currentLanguage.flag}</span>
            <span className="hidden font-medium sm:inline-block">
              {currentLanguage.name}
            </span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[180px] border-border/50 bg-background/95 backdrop-blur-md"
      >
        {i18nConfig.locales.map((locale) => {
          const lang = languageConfig[locale as keyof typeof languageConfig];
          const isActive = locale === currentLocale;

          return (
            <DropdownMenuItem
              key={locale}
              onClick={() => handleLanguageChange(locale)}
              className={`group cursor-pointer transition-all duration-200 ${
                isActive ? "bg-primary/10 text-primary" : "hover:bg-accent/50"
              }`}
            >
              <span className="mr-3 text-xl transition-transform duration-200 group-hover:scale-110">
                {lang.flag}
              </span>
              <span className="flex-1 font-medium">{lang.name}</span>
              {isActive && (
                <Check className="ml-2 h-4 w-4 text-primary animate-in fade-in zoom-in duration-200" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
