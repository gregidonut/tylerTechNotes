DROP TABLE user_tenant;

CREATE TABLE user_tenant
(
    user_tenant_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id        TEXT        NOT NULL DEFAULT auth.jwt() ->> 'sub',
    tenant_id      TEXT                 DEFAULT (auth.jwt() -> 'o'::TEXT) ->> 'id'
);

ALTER TABLE "user_tenant"
    ENABLE ROW LEVEL SECURITY;
