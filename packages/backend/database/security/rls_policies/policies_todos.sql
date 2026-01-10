CREATE POLICY "User can view their own todos"
    ON "public"."todos"
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
    EXISTS (SELECT
            FROM user_tenant ut
            WHERE ut.user_tenant_id = todos.user_tenant_id)
    );


CREATE POLICY "Enable insert for authenticated users only"
    ON "public"."todos"
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
    EXISTS (SELECT
            FROM user_tenant ut
            WHERE ut.user_tenant_id = todos.user_tenant_id)
    );