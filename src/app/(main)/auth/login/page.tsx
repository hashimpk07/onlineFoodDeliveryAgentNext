import Image from "next/image";

import { APP_CONFIG } from "@/config/app-config";

import { ThemeSwitcher } from "../../dashboard/_components/sidebar/theme-switcher";
import { LoginForm } from "../_components/login-form";

export default function LoginV2() {
  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
        <div className="space-y-2 text-center">
          <Image
            src="/backgrounds/logo.png"
            alt={APP_CONFIG.name}
            width={459}
            height={220}
            priority
            className="w-40 mx-auto mb-4"
          />
          <p className="text-sm text-primary mb-10 uppercase">
            Deliver. Manage. Grow. Repeat.
          </p>
          <h1 className="text-2xl font-medium uppercase">
            Login to your account
          </h1>
          {/* <p className="text-muted-foreground text-sm">
            Please enter your details to login.
          </p> */}
        </div>
        <div className="space-y-4">
          <LoginForm />
        </div>
      </div>

      <div className="absolute bottom-5 flex w-full justify-between px-10">
        <div className="text-sm">{APP_CONFIG.copyright}</div>
        <div className="flex items-center gap-1 text-sm">
          <ThemeSwitcher />
          {/* <LanguageSwitcher /> */}
        </div>
      </div>
    </>
  );
}
