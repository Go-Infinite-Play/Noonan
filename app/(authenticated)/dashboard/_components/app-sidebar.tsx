"use client"

import { Target, MessageCircle, TrendingUp, Settings2, User, Crown } from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"
import { NavMain } from "../_components/nav-main"
import { NavUser } from "../_components/nav-user"
import { TeamSwitcher } from "../_components/team-switcher"

export function AppSidebar({
  userData,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  userData: {
    name: string
    email: string
    avatar: string
    membership: string
  }
}) {
  const data = {
    user: userData,
    teams: [
      {
        name: "Noonan Golf",
        logo: Target,
        plan: userData.membership === "pro" ? "Pro Account" : "Free Account"
      }
    ],
    navMain: [
      {
        title: "My Rounds",
        url: "/dashboard",
        icon: Target,
        isActive: true
      },
      {
        title: "Chat with Noonan",
        url: "/dashboard/chat",
        icon: MessageCircle
      },
      {
        title: "Stats & Progress",
        url: "/dashboard/stats",
        icon: TrendingUp
      },
      {
        title: "Account",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Profile",
            url: "/dashboard/account"
          },
          {
            title: "Billing",
            url: "/dashboard/billing"
          },
          {
            title: "Support",
            url: "/dashboard/support"
          }
        ]
      }
    ]
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
