"use client";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: Icon;
    }[];
}) {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu className="gap-2">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                onClick={() =>
                                    item.url != ""
                                        ? router.push(item.url)
                                        : undefined
                                }
                                className={cn("cursor-pointer h-12", pathname === item.url && 'bg-gray-300')}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
