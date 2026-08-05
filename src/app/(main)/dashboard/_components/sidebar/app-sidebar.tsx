"use client";

import { useMemo } from "react";

import Image from "next/image";
import Link from "next/link";

import { useShallow } from "zustand/react/shallow";

import Leajlack from "@/app/[locale]/(main)/dashboard/client/orders/_components/public/Leajlak Logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config/app-config";
import { useUser } from "@/hooks/use-user";
import {
  getHomeUrlForUser,
  getSidebarForUser,
} from "@/navigation/sidebar/sidebar-filter";
import { usePreferencesStore } from "@/providers/preferences-store-provider";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { sidebarVariant, sidebarCollapsible, isSynced } = usePreferencesStore(
    useShallow((s) => ({
      sidebarVariant: s.sidebarVariant,
      sidebarCollapsible: s.sidebarCollapsible,
      isSynced: s.isSynced,
    })),
  );

  const variant = isSynced ? sidebarVariant : props.variant;
  const collapsible = isSynced ? sidebarCollapsible : props.collapsible;
  const { user } = useUser();
  // Build sidebar items based on role+permissions
  const filteredSidebarItems = useMemo(() => {
    if (!user) return [];
    return getSidebarForUser(user);
  }, [user]);
  const homeUrl = useMemo(() => getHomeUrlForUser(user ?? undefined), [user]);

  return (
    <Sidebar {...props} variant={variant} collapsible={collapsible}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href={homeUrl}>
                <Image
                  src={Leajlack}
                  alt="Leajlack"
                  width={30}
                  height={30}
                  style={{ height: "auto" }}
                />
                <span className="text-base font-semibold">
                  {APP_CONFIG.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredSidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
