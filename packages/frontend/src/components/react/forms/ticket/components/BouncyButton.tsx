import React from "react";
import { Button, type ButtonProps } from "react-aria-components";

export default function BouncyButton(props: ButtonProps): React.JSX.Element {
    return (
        <Button
            className="cursor-pointer rounded-lg border-b-[4px]
                border-drac-comment bg-drac-comment px-6 py-2 transition-all
                data-[hovered]:-translate-y-[1px] data-[hovered]:border-b-[6px]
                data-[hovered]:brightness-110 pressed:translate-y-[2px]
                pressed:border-b-[2px] pressed:brightness-90"
            {...props}
        />
    );
}
