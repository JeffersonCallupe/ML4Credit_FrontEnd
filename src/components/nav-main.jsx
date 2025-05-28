import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";
import { NavLink } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({ items }) {
  return (
     <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="text-white">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink
                to={item.url}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "#72D1F3" : "inherit", // Amarillo para activo, o el color original
                  fontWeight: isActive ? "bold" : "normal",
                })}
                end={item.url === "/"} // para que solo el "/" sea activo en el home exacto
              >
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
