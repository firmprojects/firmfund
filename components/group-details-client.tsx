"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InviteMembersDialog } from "@/components/invite-members-dialog";
import { ContributeDialog } from "@/components/contribute-dialog";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, RefreshCw, Calendar } from "lucide-react";
import { type Group } from "@/lib/data";

interface GroupDetailsClientProps {
  groupData: Group;
}

export function GroupDetailsClient({ groupData }: GroupDetailsClientProps) {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showContributeDialog, setShowContributeDialog] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold">{groupData.name}</h1>
            <Badge variant={groupData.type === 'rotating' ? 'secondary' : 'default'}>
              {groupData.type === 'rotating' ? (
                <><RefreshCw className="mr-1 h-3 w-3" /> Rotating Savings</>
              ) : (
                'Goal-based'
              )}
            </Badge>
          </div>
          <p className="text-muted-foreground">{groupData.description}</p>
        </div>
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={() => setShowInviteDialog(true)}
          >
            <Mail className="mr-2 h-4 w-4" />
            Invite Members
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => setShowContributeDialog(true)}
          >
            Contribute Now
          </Button>
        </div>
      </div>

      {groupData.type === 'rotating' ? (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Rotation Schedule</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Payout</p>
                <p className="text-2xl font-bold">
                  ${groupData.contributionAmount! * groupData.members.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="text-lg font-medium">
                  {new Date(groupData.nextPayoutDate!).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Frequency</p>
                <p className="text-lg font-medium capitalize">
                  {groupData.frequency}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Progress</span>
                <span className="font-medium">
                  ${groupData.current} / ${groupData.goal}
                </span>
              </div>
              <Progress
                value={(groupData.current / groupData.goal) * 100}
                className="bg-emerald-100"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Members</h2>
        </div>
        <div className="grid gap-4">
          {groupData.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 bg-card rounded-lg border"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Contributed: ${member.contribution}
                  </p>
                </div>
              </div>
              {groupData.type === 'rotating' && (
                <div className="text-right">
                  {member.receivedPayout ? (
                    <Badge variant="secondary">Received</Badge>
                  ) : member.payoutDate && (
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="inline-block w-4 h-4 mr-1" />
                      Due: {new Date(member.payoutDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <InviteMembersDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
      />
      <ContributeDialog
        open={showContributeDialog}
        onOpenChange={setShowContributeDialog}
        groupId={groupData.id}
      />
    </div>
  );
}