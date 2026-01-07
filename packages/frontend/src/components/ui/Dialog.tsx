import React from "react";
import { type DialogProps, Dialog as RACDialog } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Dialog(props: DialogProps): React.JSX.Element {
    return (
        <RACDialog
            {...props}
            className={twMerge(
                `relative box-border max-h-full w-full overflow-hidden
                rounded-2xl border-4 border-drac-selection bg-drac-background
                p-6 text-left align-middle text-drac-foreground shadow-xl
                outline-hidden sm:max-w-96`,
                props.className,
            )}
        />
    );
}
