import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-500",
          error && "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
