DROP FUNCTION get_ticket(p_ticket_id UUID);
CREATE OR REPLACE FUNCTION get_ticket(p_ticket_id UUID)
    RETURNS TABLE
            (
                TICKET_ID         UUID,
                CREATED_AT        TIMESTAMPTZ,
                CREATED_BY        TEXT,
                TENANT_ID         TEXT,
                TICKET_CONTENT_ID BIGINT,
                UPDATED_AT        TIMESTAMPTZ,
                UPDATED_BY        TEXT,
                ZENDESK_ID        TEXT,
                BODY              TEXT,
                STATUS            TICKET_STATUS,
                DELETED           BOOLEAN
            )
    LANGUAGE plpgsql
    SET search_path = ''
AS
$$
BEGIN
    RETURN QUERY
        SELECT t.ticket_id
             , t.created_at
             , ut.user_id AS created_by
             , ut.tenant_id
             , cut.ticket_content_id
             , cut.updated_at
             , cut.updated_by
             , cut.zendesk_id
             , cut.body
             , cut.status
             , cut.deleted
        FROM public.user_tenant AS ut
                 INNER JOIN public.tickets AS t ON ut.user_tenant_id = t.user_tenant_id
                 INNER JOIN LATERAL (SELECT ut.user_id AS updated_by
                                          , ut.tenant_id
                                          , c.ticket_id
                                          , c.ticket_content_id
                                          , c.zendesk_id
                                          , c.body
                                          , c.status
                                          , c.updated_at
                                          , c.deleted
                                     FROM public.ticket_content AS c
                                              INNER JOIN public.user_tenant AS ut ON c.user_tenant_id = ut.user_tenant_id) AS cut
                            ON t.ticket_id = cut.ticket_id
        WHERE t.ticket_id = p_ticket_id
          AND NOT cut.deleted
        ORDER BY cut.ticket_content_id DESC;
END;
$$;