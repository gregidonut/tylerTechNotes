-- DROP TABLE todos;

CREATE TABLE todos
(
    todo_id        UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    created_at     TIMESTAMPTZ      NOT NULL DEFAULT NOW(),

    user_tenant_id BIGINT           REFERENCES user_tenant (user_tenant_id) ON UPDATE CASCADE ON DELETE SET NULL
);

ALTER TABLE "todos"
    ENABLE ROW LEVEL SECURITY;
