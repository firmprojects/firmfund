"use client";

import * as React from "react";
import { OTPInput as InputOTP, SlotProps } from "input-otp";
import { cn } from "@/lib/utils";

const Slot = React.forwardRef<HTMLInputElement, SlotProps>(
  ({ char, hasFakeCaret, isActive, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative w-10 h-12 text-center text-lg font-medium",
          "border-2 border-border rounded-md",
          "transition-all duration-150",
          isActive && "border-emerald-600",
          className
        )}
      >
        <input
          ref={ref}
          className={cn(
            "absolute inset-0 w-full h-full text-center",
            "bg-background text-foreground",
            "focus:outline-none focus:ring-0"
          )}
          {...props}
        />
        {char}
        {hasFakeCaret && (
          <div className="absolute inset-0 animate-caret-blink">
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-foreground" />
          </div>
        )}
      </div>
    );
  }
);
Slot.displayName = "Slot";

export const OTPInput = React.forwardRef<
  HTMLInputElement,
  {
    value: string;
    onChange: (value: string) => void;
    maxLength: number;
  }
>(({ value, onChange, maxLength }, ref) => {
  return (
    <InputOTP
      ref={ref}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      containerClassName="flex gap-2 justify-center"
      render={({ slots }) => (
        <>
          {slots.map((slot, idx) => (
            <Slot key={idx} {...slot} />
          ))}
        </>
      )}
    />
  );
});
OTPInput.displayName = "OTPInput";