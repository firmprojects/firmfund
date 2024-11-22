"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  emails: z.string().min(1, {
    message: "Please enter at least one email address.",
  }),
});

interface InviteMembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteMembersDialog({
  open,
  onOpenChange,
}: InviteMembersDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Invitations sent successfully!");
    onOpenChange(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Members</DialogTitle>
          <DialogDescription>
            Enter email addresses of people you want to invite to your group.
            Separate multiple emails with commas.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Addresses</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email1@example.com, email2@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Invitees will receive an email with instructions to join
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Send Invites</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}