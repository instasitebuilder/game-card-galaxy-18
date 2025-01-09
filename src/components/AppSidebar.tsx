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
      <SidebarHeader className="p-6 border-b border-white/10 bg-gradient-to-r from-game-accent to-game-secondary">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-game-accent to-game-secondary flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
            B
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">BrainGames</span>
            <span className="text-sm text-white/80">Challenge Your Mind</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70 mb-2 text-sm tracking-wide">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-white/10 text-white/80 hover:text-white"
                  >
                    <Link to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className="w-5 h-5 text-game-accent" />
                      <span className="font-medium text-sm">{item.title}</span>
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
