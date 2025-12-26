CREATE POLICY "User can view their own user_tenant perms"
    ON "public"."user_tenant"
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
    (
        tenant_id IS NOT NULL
            AND (((SELECT auth.jwt()) -> 'o') ->> 'id') = (tenant_id)::TEXT
        )
        OR
    (
        tenant_id IS NULL
            AND ((SELECT auth.jwt()) -> 'o') IS NULL
            AND ((SELECT auth.jwt()) ->> 'sub') = (user_id)::TEXT
        )
    );

CREATE POLICY "Enable insert for authenticated users only"
    ON "public"."user_tenant"
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
    ((((SELECT auth.jwt() -> 'o'::TEXT) ->> 'id'::TEXT) = tenant_id) OR
     (((SELECT auth.jwt() -> 'o'::TEXT) IS NULL) AND ((auth.jwt() ->> 'sub'::TEXT) = user_id)))
    );
