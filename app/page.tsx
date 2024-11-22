import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GroupList } from "@/components/group-list";
import { PlusCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="flex max-w-[64rem] mx-auto flex-col items-center gap-4 text-center">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Pool Resources,{" "}
            <span className="text-emerald-600">Achieve Together</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Create groups, invite friends, and collectively contribute towards
            shared goals. Whether it's buying a cow or planning a group vacation,
            we make it simple.
          </p>
          <div className="space-x-4">
            <Link href="/groups/create">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create a Group
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container max-w-5xl mx-auto space-y-6 py-8">
        <div className="mx-auto flex flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Your Groups
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            View and manage your group contributions
          </p>
        </div>
        <GroupList />
      </section>
    </div>
  );
}