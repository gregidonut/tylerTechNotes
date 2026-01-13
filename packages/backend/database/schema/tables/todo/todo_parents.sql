DROP TABLE todo_parents;

CREATE TABLE todo_parents
(
    todo_parent_id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    created_at     TIMESTAMPTZ      NOT NULL DEFAULT NOW(),

    todo_id        UUID REFERENCES todos (todo_id) ON UPDATE CASCADE ON DELETE CASCADE,
    ticket_id      UUID REFERENCES tickets (ticket_id) ON UPDATE CASCADE ON DELETE CASCADE
        CHECK (
            (todo_id IS NOT NULL AND ticket_id IS NULL)
                OR (todo_id IS NULL AND ticket_id IS NOT NULL)
            )
);

ALTER TABLE "todo_parents"
    ENABLE ROW LEVEL SECURITY;


