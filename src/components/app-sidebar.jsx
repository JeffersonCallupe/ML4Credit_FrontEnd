import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

// import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
// import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useEffect, useState } from "react";
import axios from "axios";

// ...otros imports

export function AppSidebar({ ...props }) {
  const [user, setUser] = useState({
    name: "Cargando...",
    email: "",
    avatar: "", // si luego quieres usar foto
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:8000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser({
          name: res.data.full_name || "Sin nombre",
          email: res.data.email,
          avatar: "", // si tienes un campo, puedes usar res.data.avatar
        });
      })
      .catch((err) => {
        console.error("Error al obtener usuario:", err);
      });
  }, []);

  const navMain = [
    {
      title: "Inicio",
      url: "/",
      icon: IconListDetails,
    },
    {
      title: "Clientes",
      url: "/clientes",
      icon: IconUsers,
    },
    {
      title: "Campañas",
      url: "/campañas",
      icon: IconFolder,
    },
    {
      title: "Marketing Email",
      url: "/email-campanas",
      icon: IconFileDescription,
    },
    {
      title: "IA",
      url: "/ml",
      icon: IconDashboard,
    },
    {
      title: "Reportes",
      url: "/reportes",
      icon: IconChartBar,
    },
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props} className="bg-[#10113F]">
      <SidebarHeader className="bg-[#10113F]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-[#10113F]">
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter className="bg-[#10113F]">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}