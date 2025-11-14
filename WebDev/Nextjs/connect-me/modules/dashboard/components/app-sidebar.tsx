"use client"

import { TreesIcon , BarChart3 , Settings ,QrCode , TrendingUp , Link2 , Link as logo } from "lucide-react"
import { Sidebar , SidebarContent , SidebarGroup , SidebarGroupContent , SidebarGroupLabel ,
    SidebarMenu ,SidebarMenuButton , SidebarMenuItem , SidebarHeader , SidebarFooter ,SidebarSeparator 
 } from "@/components/ui/sidebar"

import Logo from "@/public/logo.png"
import Image from "next/image"
import Link from "next/link"

import { usePathname } from "next/navigation"

const mainNavItems = [
    {
        title : "My Dahboard",
        url : "/admin/my-page",
        icon : logo
    } , 
    {
        title : "Overview",
        url : "/admin/overview",
        icon : BarChart3
    } ,
    {
        title : "Settings",
        url : "/admin/settings",
        icon : Settings
    }
]

const toolsItems = [
    {
        title : "Qr Code Genrator",
        url : "/admin/tools/qr-code",
        icon : QrCode
    } , 
    {
        title : "Link Shortner",
        url : "/admin/tools/shortner",
        icon : Link2
    } , 
    {
        title : "Analytics",
        url : "/admin/tools/analytics",
        icon : TrendingUp
    }
]

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={"/"} className="flex gap-2 items-center justify-start p-4 ">
          <Image src={Logo} alt="TreeBio Logo" width={32} height={32} />
          <h1 className="text-lg font-bold text-zinc-700 dark:text-zinc-100">
            Connect-Me
          </h1>
        </Link>
        <SidebarSeparator />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={"lg"}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <>
                        <item.icon className="size-6 " />
                        <span className="font-semibold text-base">
                          {item.title}
                        </span>
                      </>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={"lg"}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-6" />
                      <span className="font-semibold text-base">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}