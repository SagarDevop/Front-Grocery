import React from "react";
import { 
  LayoutDashboard, 
  Package as PackageIcon, 
  ShoppingBag, 
  TrendingUp, 
  PlusCircle,
  User
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../Utils/cn";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/seller-dashboard" },
  { icon: PackageIcon, label: "Inventory", path: "/seller-dashboard/sellerproductlist" },
  { icon: PlusCircle, label: "Add", path: "/seller-dashboard/add-product" },
  { icon: ShoppingBag, label: "Orders", path: "/seller-dashboard/orders" },
  { icon: TrendingUp, label: "Revenue", path: "/seller-dashboard/earnings" },
  { icon: User, label: "Profile", path: "/seller-dashboard/profile" },
];

export default function SellerBottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark-gray border-t border-slate-200 dark:border-slate-800 z-50 md:hidden flex justify-around items-center pb-safe pt-2 px-1 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center p-2 flex-1 transition-all relative rounded-2xl",
              isActive ? "text-brand-500" : "text-slate-400 hover:text-brand-500"
            )}
          >
            {isActive && (
              <div className="absolute top-0 w-8 h-1 bg-brand-500 rounded-b-md -translate-y-[8px]" />
            )}
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-300",
              isActive && "scale-110"
            )} />
            <span className={cn(
              "text-[10px] font-medium mt-1 transition-all duration-300 truncate w-full text-center",
              isActive ? "text-brand-500 font-bold" : "text-slate-500"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
