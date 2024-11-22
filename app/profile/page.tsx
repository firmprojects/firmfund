"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Settings, 
  User,
  Bell,
  LogOut
} from "lucide-react";

// Dummy user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://i.pravatar.cc/150?u=john",
  totalContributions: 750,
  activeGroups: 3,
};

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and view your contributions
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>
                  {userData.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-lg">{userData.name}</p>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <h2 className="text-xl font-semibold">Contribution Summary</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Contributed</p>
                <p className="text-2xl font-bold">${userData.totalContributions}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Active Groups</p>
                <p className="text-2xl font-bold">{userData.activeGroups}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}