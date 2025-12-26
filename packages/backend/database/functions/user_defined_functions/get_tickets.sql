DROP FUNCTION get_tickets();
CREATE OR REPLACE FUNCTION get_tickets()
    RETURNS TABLE
            (
                TICKET_ID  UUID,
                CREATED_AT TIMESTAMPTZ,
                USER_ID    TEXT,
                TENANT_ID  TEXT,
                UPDATED_BY TEXT,
                UPDATED_AT TIMESTAMPTZ,
                ZENDESK_ID TEXT,
                BODY       TEXT,
                STATUS     TICKET_STATUS,
                DELETED    BOOLEAN
            )
    LANGUAGE plpgsql
    SET search_path = ''
AS
$$
BEGIN
    RETURN QUERY
        SELECT tut.ticket_id
             , tut.created_at
             , tut.created_by
             , tut.tenant_id
             , cut.updated_by
             , cut.updated_at
             , cut.zendesk_id
             , cut.body
             , cut.status
             , cut.deleted
        FROM (SELECT ut.user_id AS created_by, ut.tenant_id, t.ticket_id, t.created_at
              FROM public.tickets AS t
                       INNER JOIN public.user_tenant AS ut ON t.user_tenant_id = ut.user_tenant_id) AS tut
                 CROSS JOIN LATERAL (SELECT c.ticket_content_id
                                     FROM public.ticket_content AS c
                                     WHERE c.ticket_id = tut.ticket_id
                                     ORDER BY c.ticket_content_id DESC
                                     LIMIT 1) AS ctut
                 INNER JOIN LATERAL (SELECT ut.user_id AS updated_by
                                          , ut.tenant_id
                                          , c.ticket_content_id
                                          , c.zendesk_id
                                          , c.body
                                          , c.status
                                          , c.updated_at
                                          , c.deleted
                                     FROM public.ticket_content AS c
                                              INNER JOIN public.user_tenant AS ut ON c.user_tenant_id = ut.user_tenant_id) AS cut
                            ON cut.ticket_content_id = ctut.ticket_content_id
        WHERE NOT cut.deleted
        ORDER BY cut.updated_at DESC;
END;
$$;