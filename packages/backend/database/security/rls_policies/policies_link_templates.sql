CREATE POLICY "User can view their own link_templates"
    ON "public"."link_templates"
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
    EXISTS (SELECT
            FROM user_tenant ut
            WHERE ut.user_tenant_id = link_templates.user_tenant_id)
    );


CREATE POLICY "Enable insert for authenticated users only"
    ON "public"."link_templates"
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
    EXISTS (SELECT
            FROM user_tenant ut
            WHERE ut.user_tenant_id = link_templates.user_tenant_id)
    );