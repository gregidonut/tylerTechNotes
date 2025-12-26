DROP FUNCTION create_ticket(
    p_title TEXT,
    p_body TEXT,
    p_status TICKET_STATUS
);

CREATE OR REPLACE FUNCTION create_ticket(
    p_zendesk_id TEXT,
    p_body TEXT DEFAULT NULL,
    p_status TICKET_STATUS DEFAULT 'open'
)
    RETURNS TABLE
            (
                TICKET_ID UUID
            )
    LANGUAGE plpgsql
    SET search_path = ''
AS
$$
DECLARE
    v_user_id        TEXT := auth.jwt() ->> 'sub';
    v_tenant_id      TEXT := (auth.jwt() -> 'o'::TEXT) ->> 'id';
    v_user_tenant_id BIGINT;
BEGIN
    SELECT ut.user_tenant_id
    INTO v_user_tenant_id
    FROM public.user_tenant ut
    WHERE ut.user_id IS NOT DISTINCT FROM v_user_id
      AND ut.tenant_id IS NOT DISTINCT FROM v_tenant_id
    LIMIT 1;

    IF v_user_tenant_id IS NULL THEN
        INSERT INTO public.user_tenant (user_id, tenant_id)
        VALUES (v_user_id, v_tenant_id)
        RETURNING user_tenant_id INTO v_user_tenant_id;
    END IF;

    INSERT INTO public.tickets (user_tenant_id)
    VALUES (v_user_tenant_id)
    RETURNING tickets.ticket_id INTO ticket_id;

    INSERT INTO public.ticket_content (ticket_id, user_tenant_id, zendesk_id, body, status)
    VALUES (ticket_id, v_user_tenant_id, p_zendesk_id, p_body, p_status);

    RETURN QUERY
        SELECT ticket_id
        LIMIT 1;

END;
$$;
