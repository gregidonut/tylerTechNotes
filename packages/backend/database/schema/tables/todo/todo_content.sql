DROP TABLE todo_content;

CREATE TABLE todo_content
(
    todo_content_id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    updated_at      TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
    description     TEXT             NOT NULL,
    todo_type       TODO_TYPE        NOT NULL DEFAULT 'default',
    deleted         BOOLEAN          NOT NULL DEFAULT FALSE,

    todo_id         UUID             NOT NULL REFERENCES todos (todo_id) ON UPDATE CASCADE ON DELETE CASCADE,
    todo_parent_id  UUID             REFERENCES todo_parents (todo_parent_id) ON UPDATE CASCADE ON DELETE SET NULL,
    user_tenant_id  BIGINT           REFERENCES user_tenant (user_tenant_id) ON UPDATE CASCADE ON DELETE SET NULL
);

ALTER TABLE "todo_content"
    ENABLE ROW LEVEL SECURITY;
