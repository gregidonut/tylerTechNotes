DROP TABLE tickets;

CREATE TABLE tickets
(
    ticket_id      UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    created_at     TIMESTAMPTZ      NOT NULL DEFAULT NOW(),

    user_tenant_id BIGINT           REFERENCES user_tenant (user_tenant_id) ON UPDATE CASCADE ON DELETE SET NULL
);

ALTER TABLE "tickets"
    ENABLE ROW LEVEL SECURITY;
