"use client";

import { Users } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  if (isAuthPage) {
    return null;
  }

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-emerald-600" />
                <span className="font-bold text-xl">GroupFund</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making group contributions simple and transparent.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/groups" className="hover:text-foreground">Groups</a></li>
                <li><a href="/groups/create" className="hover:text-foreground">Create Group</a></li>
                <li><a href="/profile" className="hover:text-foreground">Profile</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>support@groupfund.com</li>
                <li>1-800-GROUP-FUND</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} GroupFund. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}