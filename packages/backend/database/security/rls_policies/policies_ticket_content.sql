CREATE POLICY "User can view their ticket histories"
    ON "public"."ticket_content"
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
    EXISTS (SELECT
            FROM user_tenant ut
            WHERE ut.user_tenant_id = ticket_content.user_tenant_id)
    );

CREATE POLICY "Enable insert for authenticated users only"
    ON "public"."ticket_content"
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
    EXISTS (SELECT
            FROM user_tenant ut
            WHERE ut.user_tenant_id = ticket_content.user_tenant_id)
    );
