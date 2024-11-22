"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GroupList } from "@/components/group-list";
import { PlusCircle } from "lucide-react";

export default function GroupsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Groups</h1>
          <p className="text-muted-foreground">
            Manage and view all your group contributions
          </p>
        </div>
        <Link href="/groups/create">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Group
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        <GroupList />
      </div>
    </div>
  );
}