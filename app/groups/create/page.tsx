"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const goalFormSchema = z.object({
  name: z.string().min(2, {
    message: "Group name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  goal: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid amount greater than 0.",
  }),
});

const rotatingFormSchema = z.object({
  name: z.string().min(2, {
    message: "Group name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  contributionAmount: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    {
      message: "Please enter a valid amount greater than 0.",
    }
  ),
  frequency: z.enum(["weekly", "monthly"]),
  memberCount: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 2 && Number(val) <= 12,
    {
      message: "Please enter a number between 2 and 12.",
    }
  ),
});

export default function CreateGroup() {
  const router = useRouter();
  
  const goalForm = useForm<z.infer<typeof goalFormSchema>>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      name: "",
      description: "",
      goal: "",
    },
  });

  const rotatingForm = useForm<z.infer<typeof rotatingFormSchema>>({
    resolver: zodResolver(rotatingFormSchema),
    defaultValues: {
      name: "",
      description: "",
      contributionAmount: "",
      frequency: "monthly",
      memberCount: "3",
    },
  });

  function onGoalSubmit(values: z.infer<typeof goalFormSchema>) {
    toast.success("Goal-based group created successfully!");
    router.push("/groups");
  }

  function onRotatingSubmit(values: z.infer<typeof rotatingFormSchema>) {
    toast.success("Rotating savings group created successfully!");
    router.push("/groups");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create a New Group</h1>
        <p className="text-muted-foreground">
          Choose a group type and set up your contribution structure
        </p>
      </div>

      <Tabs defaultValue="goal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="goal">Goal-based Group</TabsTrigger>
          <TabsTrigger value="rotating">Rotating Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="goal">
          <Form {...goalForm}>
            <form onSubmit={goalForm.handleSubmit(onGoalSubmit)} className="space-y-8">
              <FormField
                control={goalForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter group name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a name that represents your group's purpose
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={goalForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your group's purpose"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Explain what the group is collecting money for
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={goalForm.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter target amount"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Set the total amount you want to collect
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Create Goal-based Group
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="rotating">
          <Form {...rotatingForm}>
            <form onSubmit={rotatingForm.handleSubmit(onRotatingSubmit)} className="space-y-8">
              <FormField
                control={rotatingForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter group name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a name for your rotating savings group
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={rotatingForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe how the rotating savings will work"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Explain the purpose and rules of your rotating savings group
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={rotatingForm.control}
                name="contributionAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contribution Amount per Member ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter contribution amount"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Amount each member will contribute per period
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={rotatingForm.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contribution Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How often members will contribute
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={rotatingForm.control}
                name="memberCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Members</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="2"
                        max="12"
                        placeholder="Enter number of members"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Total number of members (2-12 members allowed)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Create Rotating Savings Group
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}