import { ReactNode } from "react";

import { PusherProvider } from "@/providers/pusher-provider";
import QueryProvider from "@/providers/query-provider";
import { UserStoreProvider } from "@/providers/user-store-provider";

import { UserInitializer } from "./dashboard/_components/user-initializer";

export default function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <UserStoreProvider>
      <QueryProvider>
        <UserInitializer />
        <PusherProvider>{children}</PusherProvider>
      </QueryProvider>
    </UserStoreProvider>
  );
}
