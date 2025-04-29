"use client"

import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  return (
      <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
              <SidebarMenu className="gap-2">
                  {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                              tooltip={item.title}
                              className="cursor-pointer h-12">
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
