"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { OTPInput } from "@/components/ui/otp-input";

const formSchema = z.object({
  otp: z.string().length(6, {
    message: "Please enter a valid 6-digit code.",
  }),
});

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // TODO: Verify OTP
      toast.success("Phone number verified successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendOTP = async () => {
    try {
      // TODO: Implement resend OTP logic
      toast.success("New verification code sent!");
    } catch (error) {
      toast.error("Failed to resend code. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-2 text-center mb-8">
        <Users className="h-8 w-8 text-emerald-600" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Verify your phone
        </h1>
        <p className="text-sm text-muted-foreground">
          We sent a verification code to {phoneNumber}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <OTPInput
                    value={field.value}
                    onChange={field.onChange}
                    maxLength={6}
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
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        Didn't receive the code?{" "}
        <button
          onClick={handleResendOTP}
          className="text-emerald-600 hover:underline"
        >
          Resend
        </button>
      </div>
    </>
  );
}