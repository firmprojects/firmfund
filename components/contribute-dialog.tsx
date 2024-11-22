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
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid amount greater than 0.",
  }),
});

interface ContributeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: string;
}

export function ContributeDialog({
  open,
  onOpenChange,
  groupId,
}: ContributeDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Contribution added successfully!");
    onOpenChange(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Contribution</DialogTitle>
          <DialogDescription>
            Enter the amount you want to contribute to the group.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contribution Amount ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the amount you wish to contribute
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Contribute
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}