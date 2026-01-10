DROP TABLE link_template_content;

CREATE TABLE link_template_content
(
    link_template_content_id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    updated_at               TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
    base_url                 TEXT             NOT NULL,
    description              TEXT             NOT NULL,
    deleted                  BOOLEAN          NOT NULL DEFAULT FALSE,

    link_template_id         UUID             NOT NULL REFERENCES link_templates (link_template_id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_tenant_id           BIGINT           REFERENCES user_tenant (user_tenant_id) ON UPDATE CASCADE ON DELETE SET NULL
);

ALTER TABLE "link_template_content"
    ENABLE ROW LEVEL SECURITY;
