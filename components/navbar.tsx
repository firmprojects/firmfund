"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Groups", href: "/groups", icon: Users },
  { name: "Profile", href: "/profile", icon: UserCircle },
];

export function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-emerald-600" />
            <span className="font-bold text-xl">GroupFund</span>
          </Link>

          <div className="flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}