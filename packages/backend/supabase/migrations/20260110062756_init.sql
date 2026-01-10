create type "public"."ticket_status" as enum ('open', 'in_progress', 'closed');

create type "public"."todo_type" as enum ('ticket');


  create table "public"."link_template_content" (
    "link_template_content_id" uuid not null default extensions.uuid_generate_v4(),
    "updated_at" timestamp with time zone not null default now(),
    "base_url" text not null,
    "description" text not null,
    "deleted" boolean not null default false,
    "link_template_id" uuid not null,
    "user_tenant_id" bigint
      );


alter table "public"."link_template_content" enable row level security;


  create table "public"."link_templates" (
    "link_template_id" uuid not null default extensions.uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "user_tenant_id" bigint
      );


alter table "public"."link_templates" enable row level security;


  create table "public"."ticket_content" (
    "ticket_content_id" uuid not null default extensions.uuid_generate_v4(),
    "updated_at" timestamp with time zone not null default now(),
    "zendesk_id" text not null,
    "body" text,
    "status" public.ticket_status not null default 'open'::public.ticket_status,
    "deleted" boolean not null default false,
    "ticket_id" uuid not null,
    "user_tenant_id" bigint
      );


alter table "public"."ticket_content" enable row level security;


  create table "public"."tickets" (
    "ticket_id" uuid not null default extensions.uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "user_tenant_id" bigint
      );


alter table "public"."tickets" enable row level security;


  create table "public"."todo_content" (
    "todo_content_id" uuid not null default extensions.uuid_generate_v4(),
    "updated_at" timestamp with time zone not null default now(),
    "description" text not null,
    "todo_type" public.todo_type not null,
    "deleted" boolean not null default false,
    "todo_id" uuid not null,
    "user_tenant_id" bigint
      );


alter table "public"."todo_content" enable row level security;


  create table "public"."todos" (
    "todo_id" uuid not null default extensions.uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "user_tenant_id" bigint
      );


alter table "public"."todos" enable row level security;


  create table "public"."user_tenant" (
    "user_tenant_id" bigint generated always as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" text not null default (auth.jwt() ->> 'sub'::text),
    "tenant_id" text default ((auth.jwt() -> 'o'::text) ->> 'id'::text)
      );


alter table "public"."user_tenant" enable row level security;

CREATE UNIQUE INDEX link_template_content_pkey ON public.link_template_content USING btree (link_template_content_id);

CREATE UNIQUE INDEX link_templates_pkey ON public.link_templates USING btree (link_template_id);

CREATE UNIQUE INDEX ticket_content_pkey ON public.ticket_content USING btree (ticket_content_id);

CREATE UNIQUE INDEX tickets_pkey ON public.tickets USING btree (ticket_id);

CREATE UNIQUE INDEX todo_content_pkey ON public.todo_content USING btree (todo_content_id);

CREATE UNIQUE INDEX todos_pkey ON public.todos USING btree (todo_id);

CREATE UNIQUE INDEX user_tenant_pkey ON public.user_tenant USING btree (user_tenant_id);

alter table "public"."link_template_content" add constraint "link_template_content_pkey" PRIMARY KEY using index "link_template_content_pkey";

alter table "public"."link_templates" add constraint "link_templates_pkey" PRIMARY KEY using index "link_templates_pkey";

alter table "public"."ticket_content" add constraint "ticket_content_pkey" PRIMARY KEY using index "ticket_content_pkey";

alter table "public"."tickets" add constraint "tickets_pkey" PRIMARY KEY using index "tickets_pkey";

alter table "public"."todo_content" add constraint "todo_content_pkey" PRIMARY KEY using index "todo_content_pkey";

alter table "public"."todos" add constraint "todos_pkey" PRIMARY KEY using index "todos_pkey";

alter table "public"."user_tenant" add constraint "user_tenant_pkey" PRIMARY KEY using index "user_tenant_pkey";

alter table "public"."link_template_content" add constraint "link_template_content_link_template_id_fkey" FOREIGN KEY (link_template_id) REFERENCES public.link_templates(link_template_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."link_template_content" validate constraint "link_template_content_link_template_id_fkey";

alter table "public"."link_template_content" add constraint "link_template_content_user_tenant_id_fkey" FOREIGN KEY (user_tenant_id) REFERENCES public.user_tenant(user_tenant_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."link_template_content" validate constraint "link_template_content_user_tenant_id_fkey";

alter table "public"."link_templates" add constraint "link_templates_user_tenant_id_fkey" FOREIGN KEY (user_tenant_id) REFERENCES public.user_tenant(user_tenant_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."link_templates" validate constraint "link_templates_user_tenant_id_fkey";

alter table "public"."ticket_content" add constraint "ticket_content_ticket_id_fkey" FOREIGN KEY (ticket_id) REFERENCES public.tickets(ticket_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."ticket_content" validate constraint "ticket_content_ticket_id_fkey";

alter table "public"."ticket_content" add constraint "ticket_content_user_tenant_id_fkey" FOREIGN KEY (user_tenant_id) REFERENCES public.user_tenant(user_tenant_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."ticket_content" validate constraint "ticket_content_user_tenant_id_fkey";

alter table "public"."tickets" add constraint "tickets_user_tenant_id_fkey" FOREIGN KEY (user_tenant_id) REFERENCES public.user_tenant(user_tenant_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."tickets" validate constraint "tickets_user_tenant_id_fkey";

alter table "public"."todo_content" add constraint "todo_content_todo_id_fkey" FOREIGN KEY (todo_id) REFERENCES public.todos(todo_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."todo_content" validate constraint "todo_content_todo_id_fkey";

alter table "public"."todo_content" add constraint "todo_content_user_tenant_id_fkey" FOREIGN KEY (user_tenant_id) REFERENCES public.user_tenant(user_tenant_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."todo_content" validate constraint "todo_content_user_tenant_id_fkey";

alter table "public"."todos" add constraint "todos_user_tenant_id_fkey" FOREIGN KEY (user_tenant_id) REFERENCES public.user_tenant(user_tenant_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."todos" validate constraint "todos_user_tenant_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_ticket(p_zendesk_id text, p_body text DEFAULT NULL::text, p_status public.ticket_status DEFAULT 'open'::public.ticket_status)
 RETURNS TABLE(ticket_id uuid)
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
DECLARE
    v_user_id        TEXT := auth.jwt() ->> 'sub';
    v_tenant_id      TEXT := (auth.jwt() -> 'o'::TEXT) ->> 'id';
    v_user_tenant_id BIGINT;
BEGIN
    SELECT ut.user_tenant_id
    INTO v_user_tenant_id
    FROM public.user_tenant ut
    WHERE ut.user_id IS NOT DISTINCT FROM v_user_id
      AND ut.tenant_id IS NOT DISTINCT FROM v_tenant_id
    LIMIT 1;

    IF v_user_tenant_id IS NULL THEN
        INSERT INTO public.user_tenant (user_id, tenant_id)
        VALUES (v_user_id, v_tenant_id)
        RETURNING user_tenant_id INTO v_user_tenant_id;
    END IF;

    INSERT INTO public.tickets (user_tenant_id)
    VALUES (v_user_tenant_id)
    RETURNING tickets.ticket_id INTO ticket_id;

    INSERT INTO public.ticket_content (ticket_id, user_tenant_id, zendesk_id, body, status)
    VALUES (ticket_id, v_user_tenant_id, p_zendesk_id, p_body, p_status);

    RETURN QUERY
        SELECT ticket_id
        LIMIT 1;

END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_link(p_description text)
 RETURNS TABLE(link_template_id uuid, created_at timestamp with time zone, created_by text, updated_at timestamp with time zone, updated_by text, base_url text, description text)
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.get_ticket(p_ticket_id uuid)
 RETURNS TABLE(ticket_id uuid, created_at timestamp with time zone, created_by text, tenant_id text, ticket_content_id uuid, updated_at timestamp with time zone, updated_by text, zendesk_id text, body text, status public.ticket_status, deleted boolean)
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
    RETURN QUERY
        SELECT t.ticket_id
             , t.created_at
             , ut.user_id AS created_by
             , ut.tenant_id
             , cut.ticket_content_id
             , cut.updated_at
             , cut.updated_by
             , cut.zendesk_id
             , cut.body
             , cut.status
             , cut.deleted
        FROM public.user_tenant AS ut
                 INNER JOIN public.tickets AS t ON ut.user_tenant_id = t.user_tenant_id
                 INNER JOIN LATERAL (SELECT ut.user_id AS updated_by
                                          , ut.tenant_id
                                          , c.ticket_id
                                          , c.ticket_content_id
                                          , c.zendesk_id
                                          , c.body
                                          , c.status
                                          , c.updated_at
                                          , c.deleted
                                     FROM public.ticket_content AS c
                                              INNER JOIN public.user_tenant AS ut ON c.user_tenant_id = ut.user_tenant_id) AS cut
                            ON t.ticket_id = cut.ticket_id
        WHERE t.ticket_id = p_ticket_id
          AND NOT cut.deleted
        ORDER BY cut.ticket_content_id DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_tickets()
 RETURNS TABLE(ticket_id uuid, created_at timestamp with time zone, user_id text, tenant_id text, updated_by text, updated_at timestamp with time zone, zendesk_id text, body text, status public.ticket_status, deleted boolean)
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
    RETURN QUERY
        SELECT tut.ticket_id
             , tut.created_at
             , tut.created_by
             , tut.tenant_id
             , cut.updated_by
             , cut.updated_at
             , cut.zendesk_id
             , cut.body
             , cut.status
             , cut.deleted
        FROM (SELECT ut.user_id AS created_by, ut.tenant_id, t.ticket_id, t.created_at
              FROM public.tickets AS t
                       INNER JOIN public.user_tenant AS ut ON t.user_tenant_id = ut.user_tenant_id) AS tut
                 CROSS JOIN LATERAL (SELECT c.ticket_content_id
                                     FROM public.ticket_content AS c
                                     WHERE c.ticket_id = tut.ticket_id
                                     ORDER BY c.ticket_content_id DESC
                                     LIMIT 1) AS ctut
                 INNER JOIN LATERAL (SELECT ut.user_id AS updated_by
                                          , ut.tenant_id
                                          , c.ticket_content_id
                                          , c.zendesk_id
                                          , c.body
                                          , c.status
                                          , c.updated_at
                                          , c.deleted
                                     FROM public.ticket_content AS c
                                              INNER JOIN public.user_tenant AS ut ON c.user_tenant_id = ut.user_tenant_id) AS cut
                            ON cut.ticket_content_id = ctut.ticket_content_id
        WHERE NOT cut.deleted
        ORDER BY cut.updated_at DESC;
END;
$function$
;

grant delete on table "public"."link_template_content" to "anon";

grant insert on table "public"."link_template_content" to "anon";

grant references on table "public"."link_template_content" to "anon";

grant select on table "public"."link_template_content" to "anon";

grant trigger on table "public"."link_template_content" to "anon";

grant truncate on table "public"."link_template_content" to "anon";

grant update on table "public"."link_template_content" to "anon";

grant delete on table "public"."link_template_content" to "authenticated";

grant insert on table "public"."link_template_content" to "authenticated";

grant references on table "public"."link_template_content" to "authenticated";

grant select on table "public"."link_template_content" to "authenticated";

grant trigger on table "public"."link_template_content" to "authenticated";

grant truncate on table "public"."link_template_content" to "authenticated";

grant update on table "public"."link_template_content" to "authenticated";

grant delete on table "public"."link_template_content" to "service_role";

grant insert on table "public"."link_template_content" to "service_role";

grant references on table "public"."link_template_content" to "service_role";

grant select on table "public"."link_template_content" to "service_role";

grant trigger on table "public"."link_template_content" to "service_role";

grant truncate on table "public"."link_template_content" to "service_role";

grant update on table "public"."link_template_content" to "service_role";

grant delete on table "public"."link_templates" to "anon";

grant insert on table "public"."link_templates" to "anon";

grant references on table "public"."link_templates" to "anon";

grant select on table "public"."link_templates" to "anon";

grant trigger on table "public"."link_templates" to "anon";

grant truncate on table "public"."link_templates" to "anon";

grant update on table "public"."link_templates" to "anon";

grant delete on table "public"."link_templates" to "authenticated";

grant insert on table "public"."link_templates" to "authenticated";

grant references on table "public"."link_templates" to "authenticated";

grant select on table "public"."link_templates" to "authenticated";

grant trigger on table "public"."link_templates" to "authenticated";

grant truncate on table "public"."link_templates" to "authenticated";

grant update on table "public"."link_templates" to "authenticated";

grant delete on table "public"."link_templates" to "service_role";

grant insert on table "public"."link_templates" to "service_role";

grant references on table "public"."link_templates" to "service_role";

grant select on table "public"."link_templates" to "service_role";

grant trigger on table "public"."link_templates" to "service_role";

grant truncate on table "public"."link_templates" to "service_role";

grant update on table "public"."link_templates" to "service_role";

grant delete on table "public"."ticket_content" to "anon";

grant insert on table "public"."ticket_content" to "anon";

grant references on table "public"."ticket_content" to "anon";

grant select on table "public"."ticket_content" to "anon";

grant trigger on table "public"."ticket_content" to "anon";

grant truncate on table "public"."ticket_content" to "anon";

grant update on table "public"."ticket_content" to "anon";

grant delete on table "public"."ticket_content" to "authenticated";

grant insert on table "public"."ticket_content" to "authenticated";

grant references on table "public"."ticket_content" to "authenticated";

grant select on table "public"."ticket_content" to "authenticated";

grant trigger on table "public"."ticket_content" to "authenticated";

grant truncate on table "public"."ticket_content" to "authenticated";

grant update on table "public"."ticket_content" to "authenticated";

grant delete on table "public"."ticket_content" to "service_role";

grant insert on table "public"."ticket_content" to "service_role";

grant references on table "public"."ticket_content" to "service_role";

grant select on table "public"."ticket_content" to "service_role";

grant trigger on table "public"."ticket_content" to "service_role";

grant truncate on table "public"."ticket_content" to "service_role";

grant update on table "public"."ticket_content" to "service_role";

grant delete on table "public"."tickets" to "anon";

grant insert on table "public"."tickets" to "anon";

grant references on table "public"."tickets" to "anon";

grant select on table "public"."tickets" to "anon";

grant trigger on table "public"."tickets" to "anon";

grant truncate on table "public"."tickets" to "anon";

grant update on table "public"."tickets" to "anon";

grant delete on table "public"."tickets" to "authenticated";

grant insert on table "public"."tickets" to "authenticated";

grant references on table "public"."tickets" to "authenticated";

grant select on table "public"."tickets" to "authenticated";

grant trigger on table "public"."tickets" to "authenticated";

grant truncate on table "public"."tickets" to "authenticated";

grant update on table "public"."tickets" to "authenticated";

grant delete on table "public"."tickets" to "service_role";

grant insert on table "public"."tickets" to "service_role";

grant references on table "public"."tickets" to "service_role";

grant select on table "public"."tickets" to "service_role";

grant trigger on table "public"."tickets" to "service_role";

grant truncate on table "public"."tickets" to "service_role";

grant update on table "public"."tickets" to "service_role";

grant delete on table "public"."todo_content" to "anon";

grant insert on table "public"."todo_content" to "anon";

grant references on table "public"."todo_content" to "anon";

grant select on table "public"."todo_content" to "anon";

grant trigger on table "public"."todo_content" to "anon";

grant truncate on table "public"."todo_content" to "anon";

grant update on table "public"."todo_content" to "anon";

grant delete on table "public"."todo_content" to "authenticated";

grant insert on table "public"."todo_content" to "authenticated";

grant references on table "public"."todo_content" to "authenticated";

grant select on table "public"."todo_content" to "authenticated";

grant trigger on table "public"."todo_content" to "authenticated";

grant truncate on table "public"."todo_content" to "authenticated";

grant update on table "public"."todo_content" to "authenticated";

grant delete on table "public"."todo_content" to "service_role";

grant insert on table "public"."todo_content" to "service_role";

grant references on table "public"."todo_content" to "service_role";

grant select on table "public"."todo_content" to "service_role";

grant trigger on table "public"."todo_content" to "service_role";

grant truncate on table "public"."todo_content" to "service_role";

grant update on table "public"."todo_content" to "service_role";

grant delete on table "public"."todos" to "anon";

grant insert on table "public"."todos" to "anon";

grant references on table "public"."todos" to "anon";

grant select on table "public"."todos" to "anon";

grant trigger on table "public"."todos" to "anon";

grant truncate on table "public"."todos" to "anon";

grant update on table "public"."todos" to "anon";

grant delete on table "public"."todos" to "authenticated";

grant insert on table "public"."todos" to "authenticated";

grant references on table "public"."todos" to "authenticated";

grant select on table "public"."todos" to "authenticated";

grant trigger on table "public"."todos" to "authenticated";

grant truncate on table "public"."todos" to "authenticated";

grant update on table "public"."todos" to "authenticated";

grant delete on table "public"."todos" to "service_role";

grant insert on table "public"."todos" to "service_role";

grant references on table "public"."todos" to "service_role";

grant select on table "public"."todos" to "service_role";

grant trigger on table "public"."todos" to "service_role";

grant truncate on table "public"."todos" to "service_role";

grant update on table "public"."todos" to "service_role";

grant delete on table "public"."user_tenant" to "anon";

grant insert on table "public"."user_tenant" to "anon";

grant references on table "public"."user_tenant" to "anon";

grant select on table "public"."user_tenant" to "anon";

grant trigger on table "public"."user_tenant" to "anon";

grant truncate on table "public"."user_tenant" to "anon";

grant update on table "public"."user_tenant" to "anon";

grant delete on table "public"."user_tenant" to "authenticated";

grant insert on table "public"."user_tenant" to "authenticated";

grant references on table "public"."user_tenant" to "authenticated";

grant select on table "public"."user_tenant" to "authenticated";

grant trigger on table "public"."user_tenant" to "authenticated";

grant truncate on table "public"."user_tenant" to "authenticated";

grant update on table "public"."user_tenant" to "authenticated";

grant delete on table "public"."user_tenant" to "service_role";

grant insert on table "public"."user_tenant" to "service_role";

grant references on table "public"."user_tenant" to "service_role";

grant select on table "public"."user_tenant" to "service_role";

grant trigger on table "public"."user_tenant" to "service_role";

grant truncate on table "public"."user_tenant" to "service_role";

grant update on table "public"."user_tenant" to "service_role";


  create policy "Enable insert for authenticated users only"
  on "public"."link_template_content"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT
   FROM public.user_tenant ut
  WHERE (ut.user_tenant_id = link_template_content.user_tenant_id))));



  create policy "User can view their link_template histories"
  on "public"."link_template_content"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT
   FROM public.user_tenant ut
  WHERE (ut.user_tenant_id = link_template_content.user_tenant_id))));



  create policy "Enable insert for authenticated users only"
  on "public"."link_templates"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT
   FROM public.user_tenant ut
  WHERE (ut.user_tenant_id = link_templates.user_tenant_id))));



  create policy "User can view their own link_templates"
  on "public"."link_templates"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT
   FROM public.user_tenant ut
  WHERE (ut.user_tenant_id = link_templates.user_tenant_id))));



  create policy "Enable insert for authenticated users only"
  on "public"."ticket_content"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT
   FROM public.user_tenant ut
  WHERE (ut.user_tenant_id = ticket_content.user_tenant_id))));



  create policy "User can view their ticket histories"
  on "public"."ticket_content"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT
   FROM public.user_tenant ut
  WHERE (ut.user_tenant_id = ticket_content.user_tenant_id))));



  create policy "Enable insert for authenticated users only"
  on "public"."tickets"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT
   FROM public.user_tenant ut
  WHERE (ut.user_tenant_id = tickets.user_tenant_id))));



  create policy "User can view their own tickets"
  on "public"."tickets"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT
   FROM public.user_tenant ut
  WHERE (ut.user_tenant_id = tickets.user_tenant_id))));



  create policy "Enable insert for authenticated users only"
  on "public"."todos"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT
   FROM public.user_tenant ut
  WHERE (ut.user_tenant_id = todos.user_tenant_id))));



  create policy "User can view their own todos"
  on "public"."todos"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT
   FROM public.user_tenant ut
  WHERE (ut.user_tenant_id = todos.user_tenant_id))));



  create policy "Enable insert for authenticated users only"
  on "public"."user_tenant"
  as permissive
  for insert
  to authenticated
with check ((((( SELECT (auth.jwt() -> 'o'::text)) ->> 'id'::text) = tenant_id) OR ((( SELECT (auth.jwt() -> 'o'::text)) IS NULL) AND ((auth.jwt() ->> 'sub'::text) = user_id))));



  create policy "User can view their own user_tenant perms"
  on "public"."user_tenant"
  as permissive
  for select
  to authenticated
using ((((tenant_id IS NOT NULL) AND (((( SELECT auth.jwt() AS jwt) -> 'o'::text) ->> 'id'::text) = tenant_id)) OR ((tenant_id IS NULL) AND ((( SELECT auth.jwt() AS jwt) -> 'o'::text) IS NULL) AND ((( SELECT auth.jwt() AS jwt) ->> 'sub'::text) = user_id))));



