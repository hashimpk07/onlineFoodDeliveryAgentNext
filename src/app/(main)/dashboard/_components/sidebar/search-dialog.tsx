"use client";
import * as React from "react";

import { useRouter } from "next/navigation";

// import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

// import { Button } from "@/components/ui/button";
// import {
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
// } from "@/components/ui/command";
import { useUser } from "@/hooks/use-user";
import { getSidebarForUser } from "@/navigation/sidebar/sidebar-filter";

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const { user } = useUser();
  const { t } = useTranslation();
  const router = useRouter();

  // Build sidebar items based on role+permissions
  const filteredSidebarItems = React.useMemo(() => {
    if (!user) return [];
    return getSidebarForUser(user);
  }, [user]);

  // Flatten sidebar items for search
  const searchItems = React.useMemo(() => {
    const items: Array<{
      group: string;
      label: string;
      url: string;
      icon?: any;
    }> = [];

    for (const group of filteredSidebarItems) {
      const groupLabel = group.label ? t(group.label) : "";
      for (const item of group.items) {
        items.push({
          group: groupLabel,
          label: t(item.title),
          url: item.url,
          icon: item.icon,
        });

        if (item.subItems) {
          for (const subItem of item.subItems) {
            items.push({
              group: groupLabel,
              label: `${t(item.title)} > ${t(subItem.title)}`,
              url: subItem.url,
              icon: subItem.icon ?? item.icon,
            });
          }
        }
      }
    }
    return items;
  }, [filteredSidebarItems, t]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  const groups = [...new Set(searchItems.map((item) => item.group))];

  return (
    <>
      {/* <Button
        variant="link"
        className="text-muted-foreground !px-0 font-normal hover:no-underline"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        {t("sidebar.search.label", { defaultValue: "Search" })}
        <kbd className="bg-muted inline-flex h-5 items-center gap-1 rounded border px-1.5 text-[10px] font-medium select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button> */}
      {/* <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={t("sidebar.search.placeholder", {
            defaultValue: "Search dashboards, users, and more…",
          })}
        />
        <CommandList>
          <CommandEmpty>
            {t("sidebar.search.no_results", {
              defaultValue: "No results found.",
            })}
          </CommandEmpty>
          {groups.map((group, i) => (
            <React.Fragment key={group}>
              {i !== 0 && <CommandSeparator />}
              <CommandGroup heading={group}>
                {searchItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <CommandItem
                      className="!py-1.5"
                      key={`${item.group}-${item.label}-${item.url}`}
                      onSelect={() => handleSelect(item.url)}
                    >
                      {item.icon && <item.icon className="mr-2 size-4" />}
                      <span>{item.label}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog> */}
    </>
  );
}
