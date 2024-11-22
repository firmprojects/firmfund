"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Users } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";
import "react-phone-number-input/style.css";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phoneNumber: z.string().refine((value) => isValidPhoneNumber(value), {
    message: "Please enter a valid phone number.",
  }),
});

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // TODO: Send OTP to phone number
      toast.success("OTP sent to your phone!");
      router.push(`/auth/verify?phone=${encodeURIComponent(values.phoneNumber)}`);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-2 text-center mb-8">
        <Users className="h-8 w-8 text-emerald-600" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    placeholder="John Doe"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    international
                    defaultCountry="US"
                    value={field.value}
                    onChange={(value) => field.onChange(value || "")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={isLoading}
          >
            {isLoading ? "Sending OTP..." : "Continue"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-emerald-600 hover:underline">
          Sign in
        </Link>
      </div>
    </>
  );
}