DROP TABLE ticket_content;

CREATE TABLE ticket_content
(
    ticket_content_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    updated_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    zendesk_id        TEXT          NOT NULL,
    body              TEXT,
    status            TICKET_STATUS NOT NULL DEFAULT 'open',
    deleted           BOOLEAN       NOT NULL DEFAULT FALSE,

    ticket_id         UUID          NOT NULL REFERENCES tickets (ticket_id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_tenant_id    BIGINT        REFERENCES user_tenant (user_tenant_id) ON UPDATE CASCADE ON DELETE SET NULL
);

ALTER TABLE "ticket_content"
    ENABLE ROW LEVEL SECURITY;
