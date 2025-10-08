import { useStore } from "@tanstack/react-form";
import { useEffect, useRef, useState } from "react";
import { FieldError, Input, Label, TextField } from "react-aria-components";
import { useFieldContext } from "../hooks/formContext.tsx";

export default function TextFieldWrapper({ focus }: { focus: boolean }) {
    const [mounted, setMounted] = useState(false);
    const field = useFieldContext<string>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const errors = useStore(field.store, function (state) {
        return state.meta.errors;
    });
    useEffect(function () {
        setMounted(true);
    }, []);

    useEffect(
        function () {
            if (mounted && focus && inputRef.current) {
                inputRef.current.focus();
            }
        },
        [mounted, focus],
    );

    return (
        <TextField
            value={field.state.value}
            onChange={field.handleChange}
            validationBehavior="aria"
            isInvalid={errors.length > 0}
        >
            <div className="flex-col-start gap-1">
                <Label
                    className="text-bold block w-full text-sm/6 font-medium
                        text-drac-foreground"
                >
                    {field.name}
                </Label>
                <Input
                    ref={inputRef}
                    disabled={!mounted}
                    className="block w-full min-w-0 grow rounded-lg
                        bg-transparent py-1.5 pr-3 pl-1 text-base
                        text-drac-foreground placeholder:text-drac-comment
                        focus:border-drac-cyan focus:outline-none"
                />
            </div>
            {errors && errors.length > 0 && (
                <FieldError className="flex-col-start">
                    {errors.map(function (error: string) {
                        return (
                            <em
                                key={error}
                                className="w-full text-xs text-drac-red"
                            >
                                {error}
                            </em>
                        );
                    })}
                </FieldError>
            )}
        </TextField>
    );
}
