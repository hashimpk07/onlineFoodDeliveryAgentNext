"use client";

import { useCallback } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@/hooks/use-user";
import {
  type NavGroup,
  type NavMainItem,
  type PrefetchEntry,
} from "@/navigation/sidebar/sidebar-items";

interface NavMainProps {
  readonly items: readonly NavGroup[];
}

const IsComingSoon = () => (
  <span className="ml-auto rounded-md bg-gray-200 px-2 py-1 text-xs dark:text-gray-800">
    Soon
  </span>
);

const NavItemExpanded = ({
  item,
  isActive,
  isSubmenuOpen,
  onPrefetch,
}: {
  item: NavMainItem;
  isActive: (url: string, subItems?: NavMainItem["subItems"]) => boolean;
  isSubmenuOpen: (subItems?: NavMainItem["subItems"]) => boolean;
  onPrefetch: (item: NavMainItem) => void;
}) => {
  const { t } = useTranslation();
  return (
    <Collapsible
      asChild
      defaultOpen={isSubmenuOpen(item.subItems)}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          {item.subItems ? (
            <SidebarMenuButton
              disabled={item.comingSoon}
              isActive={isActive(item.url, item.subItems)}
              tooltip={t(item.title)}
            >
              {item.icon && <item.icon />}
              <span>{t(item.title)}</span>
              {item.comingSoon && <IsComingSoon />}
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton
              asChild
              aria-disabled={item.comingSoon}
              isActive={isActive(item.url)}
              tooltip={t(item.title)}
            >
              <Link
                href={item.url}
                target={item.newTab ? "_blank" : undefined}
                onMouseEnter={
                  (item.prefetchKeys ?? item.getPrefetchKeys)
                    ? () => onPrefetch(item)
                    : undefined
                }
              >
                {item.icon && <item.icon />}
                <span>{t(item.title)}</span>
                {item.comingSoon && <IsComingSoon />}
              </Link>
            </SidebarMenuButton>
          )}
        </CollapsibleTrigger>
        {item.subItems && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.subItems.map((subItem, index) => (
                <SidebarMenuSubItem
                  key={`${item.title}-${subItem.title}-${index}`}
                >
                  <SidebarMenuSubButton
                    aria-disabled={subItem.comingSoon}
                    isActive={isActive(subItem.url)}
                    asChild
                  >
                    <Link
                      href={subItem.url}
                      target={subItem.newTab ? "_blank" : undefined}
                    >
                      {subItem.icon && <subItem.icon />}
                      <span>{t(subItem.title)}</span>
                      {subItem.comingSoon && <IsComingSoon />}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
};

const NavItemCollapsed = ({
  item,
  isActive,
  onPrefetch,
}: {
  item: NavMainItem;
  isActive: (url: string, subItems?: NavMainItem["subItems"]) => boolean;
  onPrefetch: (item: NavMainItem) => void;
}) => {
  const { t } = useTranslation();
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            disabled={item.comingSoon}
            tooltip={t(item.title)}
            isActive={isActive(item.url, item.subItems)}
          >
            {item.icon && <item.icon />}
            <span>{t(item.title)}</span>
            <ChevronRight />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-50 space-y-1"
          side="right"
          align="start"
        >
          {item.subItems?.map((subItem, index) => (
            <DropdownMenuItem
              key={`${item.title}-${subItem.title}-${index}`}
              asChild
            >
              <SidebarMenuSubButton
                asChild
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-0 data-[active=true]:text-primary"
                aria-disabled={subItem.comingSoon}
                isActive={isActive(subItem.url)}
              >
                <Link
                  href={subItem.url}
                  target={subItem.newTab ? "_blank" : undefined}
                >
                  {subItem.icon && (
                    <subItem.icon className="[&>svg]:text-popover-foreground" />
                  )}
                  <span>{t(subItem.title)}</span>
                  {subItem.comingSoon && <IsComingSoon />}
                </Link>
              </SidebarMenuSubButton>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export function NavMain({ items }: NavMainProps) {
  const path = usePathname();
  const { state, isMobile } = useSidebar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  const handlePrefetch = useCallback(
    (item: NavMainItem) => {
      const keys: PrefetchEntry[] = [
        ...(item.prefetchKeys ?? []),
        ...(item.getPrefetchKeys?.({ companyId }) ?? []),
      ];
      keys.forEach(({ queryKey, queryFn }) => {
        void queryClient.prefetchQuery({ queryKey, queryFn });
      });
    },
    [queryClient, companyId],
  );

  const isItemActive = (url: string, subItems?: NavMainItem["subItems"]) => {
    if (subItems?.length) {
      return subItems.some((sub) => path.startsWith(sub.url));
    }
    return path === url;
  };

  const isSubmenuOpen = (subItems?: NavMainItem["subItems"]) => {
    return subItems?.some((sub) => path.startsWith(sub.url)) ?? false;
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2" />
      </SidebarGroup>
      {items.map((group) => (
        <SidebarGroup key={group.id}>
          {group.label && (
            <SidebarGroupLabel>{t(group.label)}</SidebarGroupLabel>
          )}
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {group.items.map((item, index) => {
                const itemKey = `${group.id}-${item.title}-${index}`;

                if (!item.subItems) {
                  return (
                    <SidebarMenuItem key={itemKey}>
                      <SidebarMenuButton
                        asChild
                        aria-disabled={item.comingSoon}
                        tooltip={t(item.title)}
                        isActive={isItemActive(item.url)}
                      >
                        <Link
                          href={item.url}
                          target={item.newTab ? "_blank" : undefined}
                          onMouseEnter={
                            (item.prefetchKeys ?? item.getPrefetchKeys)
                              ? () => handlePrefetch(item)
                              : undefined
                          }
                        >
                          {item.icon && <item.icon />}
                          <span>{t(item.title)}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                if (state === "collapsed" && !isMobile) {
                  return (
                    <NavItemCollapsed
                      key={itemKey}
                      item={item}
                      isActive={isItemActive}
                      onPrefetch={handlePrefetch}
                    />
                  );
                }
                return (
                  <NavItemExpanded
                    key={itemKey}
                    item={item}
                    isActive={isItemActive}
                    isSubmenuOpen={isSubmenuOpen}
                    onPrefetch={handlePrefetch}
                  />
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
