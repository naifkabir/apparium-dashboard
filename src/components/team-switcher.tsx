"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function TeamSwitcher({
  company,
}: {
  company: {
    name: string;
    logo: string;
    industry: string;
  }[];
}) {
  return (
    <SidebarMenu>
      {company.map((c, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-white">
              <Image src={c.logo} alt={c.name} width={24} height={24}></Image>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{c.name}</span>
              <span className="truncate text-xs">{c.industry}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
