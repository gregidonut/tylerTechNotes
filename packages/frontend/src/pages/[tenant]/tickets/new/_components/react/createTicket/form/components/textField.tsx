import { useStore } from "@tanstack/react-form";
import { FieldError, Input, Label, TextField } from "react-aria-components";
import { useFieldContext } from "../hooks/formContext.tsx";

export default function TextFieldWrapper() {
    const field = useFieldContext<string>();

    const errors = useStore(field.store, function (state) {
        return state.meta.errors;
    });

    return (
        <TextField
            value={field.state.value}
            onChange={field.handleChange}
            validationBehavior="aria"
            isInvalid={errors.length > 0}
        >
            <Label>{field.name}</Label>
            <Input />
            {errors && errors.length > 0 && (
                <FieldError>
                    {errors.map(function (error: string) {
                        return (
                            <em key={error} className="text-drac-red">
                                {error}
                            </em>
                        );
                    })}
                </FieldError>
            )}
        </TextField>
    );
}
