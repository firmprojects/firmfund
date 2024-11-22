"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, RefreshCw } from "lucide-react";
import { groups } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function GroupList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <Card key={group.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <Badge variant={group.type === 'rotating' ? 'secondary' : 'default'}>
                  {group.type === 'rotating' ? (
                    <><RefreshCw className="mr-1 h-3 w-3" /> Rotating Savings</>
                  ) : (
                    'Goal-based'
                  )}
                </Badge>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">{group.members.length}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-2">
              {group.type === 'rotating' ? (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Next Payout</span>
                    <span className="font-medium">${group.contributionAmount! * group.members.length}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Due: {new Date(group.nextPayoutDate!).toLocaleDateString()}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      ${group.current} / ${group.goal}
                    </span>
                  </div>
                  <Progress
                    value={(group.current / group.goal) * 100}
                    className="bg-emerald-100"
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/groups/${group.id}`} className="w-full">
              <Button className="w-full" variant="outline">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}