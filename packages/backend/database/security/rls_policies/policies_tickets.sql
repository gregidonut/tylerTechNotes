CREATE POLICY "User can view their own tickets"
    ON "public"."tickets"
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
    EXISTS (SELECT
            FROM user_tenant ut
            WHERE ut.user_tenant_id = tickets.user_tenant_id)
    );


CREATE POLICY "Enable insert for authenticated users only"
    ON "public"."tickets"
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
    EXISTS (SELECT
            FROM user_tenant ut
            WHERE ut.user_tenant_id = tickets.user_tenant_id)
    );