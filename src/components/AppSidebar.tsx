import { Home, CalendarDays, Info, FileText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
  {
    title: "Terms & Services",
    url: "/terms",
    icon: FileText,
  },
  {
    title: "Future Games",
    url: "/future-games",
    icon: CalendarDays,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-gradient-to-b from-game-surface to-game-secondary text-white min-h-screen">
      {/* Header */}
      <SidebarHeader className="p-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-game-accent to-game-secondary flex items-center justify-center text-white font-bold text-xl">
            B
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-xl">BrainGames</span>
            <span className="text-sm text-white/70">Challenge Your Mind</span>
          </div>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* Navigation Group */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-6 text-lg font-bold text-white/80">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4 space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group flex items-center gap-4 px-6 py-3 text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-all"
                  >
                    <Link to={item.url}>
                      <item.icon className="w-5 h-5 group-hover:text-game-accent transition-colors" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="mt-auto px-6 py-4 border-t border-white/10 text-white/70 text-sm">
          <p>© 2025 BrainGames</p>
          <p>All rights reserved.</p>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
