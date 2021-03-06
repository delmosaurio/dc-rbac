-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.8.2
-- PostgreSQL version: 9.5
-- Project Site: pgmodeler.com.br
-- Model Author: ---


-- Database creation must be done outside an multicommand file.
-- These commands were put in this file only for convenience.
-- -- object: rbac | type: DATABASE --
-- -- DROP DATABASE IF EXISTS rbac;
-- CREATE DATABASE rbac
-- ;
-- -- ddl-end --
-- 

-- object: public.signon | type: TYPE --
-- DROP TYPE IF EXISTS public.signon CASCADE;
CREATE TYPE public.signon AS
 ENUM ('local','google','facebook','twitter','github');
-- ddl-end --
ALTER TYPE public.signon OWNER TO postgres;
-- ddl-end --

-- object: public.account_state | type: TYPE --
-- DROP TYPE IF EXISTS public.account_state CASCADE;
CREATE TYPE public.account_state AS
 ENUM ('verifying','enabled','disabled');
-- ddl-end --
ALTER TYPE public.account_state OWNER TO postgres;
-- ddl-end --

-- object: public.users | type: TABLE --
-- DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users(
	user_id bigserial NOT NULL,
	signon_type public.signon NOT NULL DEFAULT 'local',
	username varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100),
	user_salt varchar(100),
	user_state public.account_state NOT NULL DEFAULT 'verifying',
	force_change_password bool NOT NULL,
	created_at timestamp NOT NULL,
	updated_at timestamp NOT NULL,
	first_name varchar(100),
	last_name varchar(100),
	google_id varchar(100),
	account_image varchar(200),
	account_google_url varchar(200),
	CONSTRAINT pk_users PRIMARY KEY (user_id),
	CONSTRAINT uq_users_username UNIQUE (username),
	CONSTRAINT uq_users_email UNIQUE (email)

);
-- ddl-end --
ALTER TABLE public.users OWNER TO postgres;
-- ddl-end --

-- object: public.token_type | type: TYPE --
-- DROP TYPE IF EXISTS public.token_type CASCADE;
CREATE TYPE public.token_type AS
 ENUM ('activation','password_change');
-- ddl-end --
ALTER TYPE public.token_type OWNER TO postgres;
-- ddl-end --

-- object: public.tokens | type: TABLE --
-- DROP TABLE IF EXISTS public.tokens CASCADE;
CREATE TABLE public.tokens(
	token varchar(100) NOT NULL,
	user_id_users integer NOT NULL,
	type public.token_type NOT NULL,
	expiration timestamp NOT NULL,
	token_salt varchar(100) NOT NULL,
	CONSTRAINT pk_tokens PRIMARY KEY (token)

);
-- ddl-end --
ALTER TABLE public.tokens OWNER TO postgres;
-- ddl-end --

-- object: public.apps | type: TABLE --
-- DROP TABLE IF EXISTS public.apps CASCADE;
CREATE TABLE public.apps(
	app_id serial NOT NULL,
	app varchar(30),
	app_caption varchar(30) NOT NULL,
	app_description text,
	client_id varchar(200) NOT NULL,
	client_secret varchar(200) NOT NULL,
	redirect_uris varchar(200) NOT NULL,
	CONSTRAINT pk_app PRIMARY KEY (app_id),
	CONSTRAINT uq_apps UNIQUE (app)

);
-- ddl-end --
ALTER TABLE public.apps OWNER TO postgres;
-- ddl-end --

-- object: public.groups | type: TABLE --
-- DROP TABLE IF EXISTS public.groups CASCADE;
CREATE TABLE public.groups(
	group_id bigserial NOT NULL,
	group_name varchar(100) NOT NULL,
	group_description text,
	CONSTRAINT pk_groups PRIMARY KEY (group_id),
	CONSTRAINT uq_groups_group_name UNIQUE (group_name)

);
-- ddl-end --
ALTER TABLE public.groups OWNER TO postgres;
-- ddl-end --

-- object: public.groups_memberships | type: TABLE --
-- DROP TABLE IF EXISTS public.groups_memberships CASCADE;
CREATE TABLE public.groups_memberships(
	group_id_groups integer NOT NULL,
	user_id_users integer NOT NULL,
	CONSTRAINT pk_groups_memberships PRIMARY KEY (user_id_users,group_id_groups)

);
-- ddl-end --
ALTER TABLE public.groups_memberships OWNER TO postgres;
-- ddl-end --

-- object: public.group_has_groups | type: TABLE --
-- DROP TABLE IF EXISTS public.group_has_groups CASCADE;
CREATE TABLE public.group_has_groups(
	group_id_groups integer NOT NULL,
	has_group_id integer NOT NULL,
	CONSTRAINT pk_groups_groups PRIMARY KEY (group_id_groups,has_group_id)

);
-- ddl-end --
ALTER TABLE public.group_has_groups OWNER TO postgres;
-- ddl-end --

-- object: public.modules | type: TABLE --
-- DROP TABLE IF EXISTS public.modules CASCADE;
CREATE TABLE public.modules(
	module_id serial NOT NULL,
	module varchar(30) NOT NULL,
	module_caption varchar(30),
	app_id_apps integer NOT NULL,
	module_description text,
	CONSTRAINT pk_modules PRIMARY KEY (module_id),
	CONSTRAINT uq_module UNIQUE (module)

);
-- ddl-end --
ALTER TABLE public.modules OWNER TO postgres;
-- ddl-end --

-- object: public.actions | type: TABLE --
-- DROP TABLE IF EXISTS public.actions CASCADE;
CREATE TABLE public.actions(
	action_id serial NOT NULL,
	action varchar(30),
	module_id_modules integer NOT NULL,
	action_caption varchar(30),
	action_description text,
	CONSTRAINT pk_actions PRIMARY KEY (action_id),
	CONSTRAINT uq_action UNIQUE (action)

);
-- ddl-end --
ALTER TABLE public.actions OWNER TO postgres;
-- ddl-end --

-- object: public.role_type | type: TYPE --
-- DROP TYPE IF EXISTS public.role_type CASCADE;
CREATE TYPE public.role_type AS
 ENUM ('group','user','self');
-- ddl-end --
ALTER TYPE public.role_type OWNER TO postgres;
-- ddl-end --

-- object: public.users_privileges | type: TABLE --
-- DROP TABLE IF EXISTS public.users_privileges CASCADE;
CREATE TABLE public.users_privileges(
	user_id_users integer NOT NULL,
	action_id_actions integer NOT NULL,
	action_grant bool NOT NULL,
	action_deny bool NOT NULL,
	CONSTRAINT pk_users_privileges PRIMARY KEY (user_id_users,action_id_actions)

);
-- ddl-end --
ALTER TABLE public.users_privileges OWNER TO postgres;
-- ddl-end --

-- object: public.groups_privileges | type: TABLE --
-- DROP TABLE IF EXISTS public.groups_privileges CASCADE;
CREATE TABLE public.groups_privileges(
	group_id_groups integer NOT NULL,
	action_id_actions integer NOT NULL,
	action_grant bool NOT NULL,
	action_deny bool NOT NULL,
	CONSTRAINT pk_groups_privileges PRIMARY KEY (group_id_groups,action_id_actions)

);
-- ddl-end --
ALTER TABLE public.groups_privileges OWNER TO postgres;
-- ddl-end --

-- object: public.object_types | type: TABLE --
-- DROP TABLE IF EXISTS public.object_types CASCADE;
CREATE TABLE public.object_types(
	object_type_id varchar(50) NOT NULL,
	target_table varchar(50),
	target_id_field integer,
	CONSTRAINT pk_object_type PRIMARY KEY (object_type_id)

);
-- ddl-end --
ALTER TABLE public.object_types OWNER TO postgres;
-- ddl-end --

-- object: public.objects | type: TABLE --
-- DROP TABLE IF EXISTS public.objects CASCADE;
CREATE TABLE public.objects(
	object_id bigserial NOT NULL,
	object_type varchar(50) NOT NULL,
	target_id integer,
	object_description varchar(100),
	CONSTRAINT pk_objects PRIMARY KEY (object_id)

);
-- ddl-end --
ALTER TABLE public.objects OWNER TO postgres;
-- ddl-end --

-- object: public.group_scopes | type: TABLE --
-- DROP TABLE IF EXISTS public.group_scopes CASCADE;
CREATE TABLE public.group_scopes(
	group_id_groups integer NOT NULL,
	object_id_objects integer NOT NULL,
	access_grant bool NOT NULL,
	access_deny bool NOT NULL,
	CONSTRAINT pk_group_scopes PRIMARY KEY (group_id_groups,object_id_objects)

);
-- ddl-end --
ALTER TABLE public.group_scopes OWNER TO postgres;
-- ddl-end --

-- object: public.user_scopes | type: TABLE --
-- DROP TABLE IF EXISTS public.user_scopes CASCADE;
CREATE TABLE public.user_scopes(
	user_id_users integer NOT NULL,
	object_id_objects integer NOT NULL,
	access_grant bool,
	access_deny bool NOT NULL,
	CONSTRAINT pk_user_scopes PRIMARY KEY (user_id_users,object_id_objects)

);
-- ddl-end --
ALTER TABLE public.user_scopes OWNER TO postgres;
-- ddl-end --

-- object: fk_tokes_users | type: CONSTRAINT --
-- ALTER TABLE public.tokens DROP CONSTRAINT IF EXISTS fk_tokes_users CASCADE;
ALTER TABLE public.tokens ADD CONSTRAINT fk_tokes_users FOREIGN KEY (user_id_users)
REFERENCES public.users (user_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_groups_memberships_users | type: CONSTRAINT --
-- ALTER TABLE public.groups_memberships DROP CONSTRAINT IF EXISTS fk_groups_memberships_users CASCADE;
ALTER TABLE public.groups_memberships ADD CONSTRAINT fk_groups_memberships_users FOREIGN KEY (user_id_users)
REFERENCES public.users (user_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_groups_memberships_groups | type: CONSTRAINT --
-- ALTER TABLE public.groups_memberships DROP CONSTRAINT IF EXISTS fk_groups_memberships_groups CASCADE;
ALTER TABLE public.groups_memberships ADD CONSTRAINT fk_groups_memberships_groups FOREIGN KEY (group_id_groups)
REFERENCES public.groups (group_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_groups_groups_group_id_groups | type: CONSTRAINT --
-- ALTER TABLE public.group_has_groups DROP CONSTRAINT IF EXISTS fk_groups_groups_group_id_groups CASCADE;
ALTER TABLE public.group_has_groups ADD CONSTRAINT fk_groups_groups_group_id_groups FOREIGN KEY (group_id_groups)
REFERENCES public.groups (group_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_groups_groups_has_group_id | type: CONSTRAINT --
-- ALTER TABLE public.group_has_groups DROP CONSTRAINT IF EXISTS fk_groups_groups_has_group_id CASCADE;
ALTER TABLE public.group_has_groups ADD CONSTRAINT fk_groups_groups_has_group_id FOREIGN KEY (has_group_id)
REFERENCES public.groups (group_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_modules_apps | type: CONSTRAINT --
-- ALTER TABLE public.modules DROP CONSTRAINT IF EXISTS fk_modules_apps CASCADE;
ALTER TABLE public.modules ADD CONSTRAINT fk_modules_apps FOREIGN KEY (app_id_apps)
REFERENCES public.apps (app_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_actions_modules | type: CONSTRAINT --
-- ALTER TABLE public.actions DROP CONSTRAINT IF EXISTS fk_actions_modules CASCADE;
ALTER TABLE public.actions ADD CONSTRAINT fk_actions_modules FOREIGN KEY (module_id_modules)
REFERENCES public.modules (module_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_users_privileges_users | type: CONSTRAINT --
-- ALTER TABLE public.users_privileges DROP CONSTRAINT IF EXISTS fk_users_privileges_users CASCADE;
ALTER TABLE public.users_privileges ADD CONSTRAINT fk_users_privileges_users FOREIGN KEY (user_id_users)
REFERENCES public.users (user_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_users_privileges_actions | type: CONSTRAINT --
-- ALTER TABLE public.users_privileges DROP CONSTRAINT IF EXISTS fk_users_privileges_actions CASCADE;
ALTER TABLE public.users_privileges ADD CONSTRAINT fk_users_privileges_actions FOREIGN KEY (action_id_actions)
REFERENCES public.actions (action_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_groups_privileges_groups | type: CONSTRAINT --
-- ALTER TABLE public.groups_privileges DROP CONSTRAINT IF EXISTS fk_groups_privileges_groups CASCADE;
ALTER TABLE public.groups_privileges ADD CONSTRAINT fk_groups_privileges_groups FOREIGN KEY (group_id_groups)
REFERENCES public.groups (group_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_groups_privileges_actions | type: CONSTRAINT --
-- ALTER TABLE public.groups_privileges DROP CONSTRAINT IF EXISTS fk_groups_privileges_actions CASCADE;
ALTER TABLE public.groups_privileges ADD CONSTRAINT fk_groups_privileges_actions FOREIGN KEY (action_id_actions)
REFERENCES public.actions (action_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_objects_object_types | type: CONSTRAINT --
-- ALTER TABLE public.objects DROP CONSTRAINT IF EXISTS fk_objects_object_types CASCADE;
ALTER TABLE public.objects ADD CONSTRAINT fk_objects_object_types FOREIGN KEY (object_type)
REFERENCES public.object_types (object_type_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_group_scopes_groups | type: CONSTRAINT --
-- ALTER TABLE public.group_scopes DROP CONSTRAINT IF EXISTS fk_group_scopes_groups CASCADE;
ALTER TABLE public.group_scopes ADD CONSTRAINT fk_group_scopes_groups FOREIGN KEY (group_id_groups)
REFERENCES public.groups (group_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_group_scopes_objects | type: CONSTRAINT --
-- ALTER TABLE public.group_scopes DROP CONSTRAINT IF EXISTS fk_group_scopes_objects CASCADE;
ALTER TABLE public.group_scopes ADD CONSTRAINT fk_group_scopes_objects FOREIGN KEY (object_id_objects)
REFERENCES public.objects (object_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_user_scopes_users | type: CONSTRAINT --
-- ALTER TABLE public.user_scopes DROP CONSTRAINT IF EXISTS fk_user_scopes_users CASCADE;
ALTER TABLE public.user_scopes ADD CONSTRAINT fk_user_scopes_users FOREIGN KEY (user_id_users)
REFERENCES public.users (user_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_user_scopes_objects | type: CONSTRAINT --
-- ALTER TABLE public.user_scopes DROP CONSTRAINT IF EXISTS fk_user_scopes_objects CASCADE;
ALTER TABLE public.user_scopes ADD CONSTRAINT fk_user_scopes_objects FOREIGN KEY (object_id_objects)
REFERENCES public.objects (object_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


