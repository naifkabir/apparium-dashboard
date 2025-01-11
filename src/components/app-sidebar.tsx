"use client";

import * as React from "react";
import { LayoutDashboard, BellRing } from "lucide-react";
import { NavPages } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Admin",
    email: "admin@admin.com",
    avatar: "/profile.jpg",
  },
  company: [
    {
      name: "Apparium Dashboard",
      logo: "/logo-apparium.png",
      industry: "IT Services",
    },
  ],
  pages: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Contact Us",
      url: "/contact-us",
      icon: BellRing,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher company={data.company} />
      </SidebarHeader>
      <SidebarContent>
        <NavPages pages={data.pages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
