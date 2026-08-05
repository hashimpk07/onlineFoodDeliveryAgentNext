"use client";

import { PropsWithChildren } from "react";

import { createInstance, Resource } from "i18next";
import { I18nextProvider } from "react-i18next";

import initTranslations from "@/lib/i18n";

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: PropsWithChildren<{
  locale: string;
  namespaces: string[];
  resources: Resource;
}>) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
