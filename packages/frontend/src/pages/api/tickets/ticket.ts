import { type Database } from "@/utils/models/supabase";
export type Ticket = Database["public"]["Tables"]["tickets"]["Row"];
