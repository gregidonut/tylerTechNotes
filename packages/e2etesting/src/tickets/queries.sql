/* @name GetTickets */
SELECT * FROM tickets;


/* @name TruncateTickets */
TRUNCATE ticket_content, tickets, user_tenant CASCADE;
