import React, { useState } from "react";
import { cn } from "@/lib/utils";

function Switch({ className, checked, onChange, disabled, ...props }) {
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleToggle = () => {
        if (disabled) return;
        const newState = !isChecked;
        setIsChecked(newState);
        onChange?.(newState);
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isChecked}
            onClick={handleToggle}
            disabled={disabled}
            className={cn(
                "inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
                isChecked ? "bg-primary" : "bg-input dark:bg-input/80",
                className
            )}
            {...props}
        >
            <span
                className={cn(
                    "pointer-events-none block size-4 rounded-full ring-0 transition-transform",
                    isChecked
                        ? "translate-x-[calc(100%-2px)] dark:bg-primary-foreground bg-background"
                        : "translate-x-0 dark:bg-foreground bg-background"
                )}
            />
        </button>
    );
}

export { Switch };
