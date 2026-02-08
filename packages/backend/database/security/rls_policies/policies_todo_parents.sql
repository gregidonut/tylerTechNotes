CREATE POLICY "User can view their todo histories"
    ON "public"."todo_parents"
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Enable insert for authenticated users only"
    ON "public"."todo_parents"
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);
