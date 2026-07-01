import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getUser, logout } from "../lib/auth";

export type NavItem = {
  label: string;
  href: string;
  icon: string;
  roles?: string[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "⬛" },
  { label: "Employees", href: "/employees", icon: "👥" },
  { label: "Attendance", href: "/attendance", icon: "📅" },
  { label: "Payroll", href: "/payroll", icon: "💰", roles: ["ADMIN", "HR"] },
  { label: "Performance", href: "/performance", icon: "📊" },
  { label: "AI Insights", href: "/ai-insights", icon: "🤖", roles: ["ADMIN", "HR", "MANAGER"] },
];

export function Sidebar() {
  const [user, setUser] = useState<{ fullName: string; role: string } | null>(null);
  useEffect(() => {
    setUser(getUser());
  }, []);
  return (
    <aside className="w-56 min-h-screen border-r border-border flex flex-col bg-background sticky top-0">
      <div className="px-6 py-5 border-b border-border">
        <Link to="/dashboard" className="font-display text-lg font-extrabold tracking-tighter">
          NEXUS<span className="text-primary">HR</span>
        </Link>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {NAV_ITEMS.filter(item => !item.roles || (user?.role && item.roles.includes(user.role))).map((item) => (
          <Link
            key={item.href}
            to={item.href}
            activeProps={{ className: "text-foreground bg-foreground/5" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-foreground/5" }}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-sm transition-colors"
          >
            <span className="text-xs">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-border">
        <div className="text-xs font-medium text-foreground truncate">{user?.fullName}</div>
        <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{user?.role}</div>
        <button
          id="logout-btn"
          onClick={logout}
          className="mt-3 text-xs text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
        >
          Sign out →
        </button>
      </div>
    </aside>
  );
}
