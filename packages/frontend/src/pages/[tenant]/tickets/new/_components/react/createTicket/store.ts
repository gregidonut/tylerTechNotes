import { signal } from "@preact/signals-react";
import { useForm } from "@tanstack/react-form";

export const formSignal = signal<typeof useForm | null>(null);
