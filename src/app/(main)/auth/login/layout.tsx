import { ReactNode } from "react";

import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <div className="grid h-dvh justify-center  lg:grid-cols-2">
        <div
          className="bg-primary relative order-2 hidden h-full rounded-3xl lg:flex items-center justify-center"
          // style={{ backgroundImage: "url('/backgrounds/login_background.png')" }}
        >
          <Image
            src="/backgrounds/login_v2_background.png"
            alt="Login Background"
            fill
            sizes="50vw"
            // unoptimized
            className="object-cover"
            priority
          />
          <div className="text-primary-foreground absolute top-10 space-y-1 px-10">
            {/* <h1 className="text-2xl font-medium text-primary">
              {APP_CONFIG.name}
            </h1>
            <p className="text-sm text-primary">
              Deliver. Manage. Grow. Repeat.
            </p> */}
          </div>
        </div>
        <div className="relative order-1 flex h-full">{children}</div>
      </div>
    </main>
  );
}
