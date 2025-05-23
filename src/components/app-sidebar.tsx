'use client'
import { Home } from "lucide-react";
import Cookies from "js-cookie";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Formulario",
    url: "#",
    icon: Home,
  },
];

export function AppSidebar() {

        const router = useRouter();
    function handleLogout(){
        Cookies.remove("token", { path: "/" });
        router.push("/");
    }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout} className="w-full bg-black font-bold">Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
