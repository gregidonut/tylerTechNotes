DROP FUNCTION get_link(p_description TEXT);
CREATE OR REPLACE FUNCTION get_link(p_description TEXT)
    RETURNS TABLE
            (
                LINK_TEMPLATE_ID UUID,
                CREATED_AT       TIMESTAMPTZ,
                CREATED_BY       TEXT,
                UPDATED_AT       TIMESTAMPTZ,
                UPDATED_BY       TEXT,
                BASE_URL         TEXT,
                DESCRIPTION      TEXT
            )
    LANGUAGE plpgsql
    SET search_path = ''
AS
$$
BEGIN
    RETURN QUERY
        SELECT lt.link_template_id
             , lt.created_at
             , ut.user_id AS created_by
             , ltcut.updated_at
             , ltcut.updated_by
             , ltcut.base_url
             , ltcut.description
        FROM public.user_tenant AS ut
                 INNER JOIN public.link_templates AS lt ON ut.user_tenant_id = lt.user_tenant_id
                 INNER JOIN LATERAL (SELECT ut.user_id AS updated_by
                                          , ut.tenant_id
                                          , c.link_template_id
                                          , c.link_template_content_id
                                          , c.base_url
                                          , c.description
                                          , c.updated_at
                                          , c.deleted
                                     FROM public.link_template_content AS c
                                              INNER JOIN public.user_tenant AS ut ON c.user_tenant_id = ut.user_tenant_id
            ) AS ltcut
                            ON ltcut.link_template_id = lt.link_template_id
        WHERE ltcut.description = p_description
          AND NOT ltcut.deleted
        ORDER BY ltcut.link_template_content_id DESC
        LIMIT 1;
END;
$$;