import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "../hooks/formContext.tsx";

export default function TextFieldWrapper() {
    const field = useFieldContext<string>();

    const errors = useStore(field.store, function (state) {
        return state.meta.errors;
    });

    return (
        <p>
            <label htmlFor={field.name}>{field.name}</label>
            <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                type="text"
                onChange={function (e) {
                    field.handleChange(e.currentTarget.value);
                }}
            />
            {errors.map(function (error: string) {
                return (
                    <em key={error} style={{ color: "red" }}>
                        {error}
                    </em>
                );
            })}
        </p>
    );
}
