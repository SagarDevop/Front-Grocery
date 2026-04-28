import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Store, 
  Settings, 
  Box
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../Utils/cn";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/admin-dashboard" },
  { icon: Store, label: "Sellers", path: "/admin-dashboard/sellers" },
  { icon: Box, label: "Products", path: "/admin-dashboard/products" },
  { icon: ShoppingBag, label: "Orders", path: "/admin-dashboard/orders" },
  { icon: Users, label: "Users", path: "/admin-dashboard/users" },
  { icon: Settings, label: "Settings", path: "/admin-dashboard/settings" },
];

export default function AdminBottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden flex justify-around items-center pb-safe pt-2 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center p-2 min-w-[64px] transition-all relative rounded-xl",
              isActive ? "text-emerald-600" : "text-gray-400 hover:text-emerald-500 hover:bg-emerald-50/50"
            )}
          >
            {isActive && (
              <div className="absolute top-0 w-8 h-1 bg-emerald-600 rounded-b-md -translate-y-[8px]" />
            )}
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-300",
              isActive && "scale-110"
            )} />
            <span className={cn(
              "text-[10px] font-medium mt-1 transition-all duration-300",
              isActive ? "text-emerald-600 font-bold" : "text-gray-500"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
