CREATE TYPE TICKET_STATUS AS ENUM ('open', 'in_progress', 'closed');

DROP TYPE TODO_TYPE CASCADE;
CREATE TYPE TODO_TYPE AS ENUM ('default', 'ticket');
