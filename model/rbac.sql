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
	first_name varchar(100),
	last_name varchar(100),
	google_id varchar(100),
	account_image varchar(200),
	account_google_url varchar(200),
	created_at date NOT NULL,
	updated_at date NOT NULL,
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
	expiration date NOT NULL,
	token_salt varchar(100) NOT NULL,
	CONSTRAINT pk_tokens PRIMARY KEY (token)

);
-- ddl-end --
ALTER TABLE public.tokens OWNER TO postgres;
-- ddl-end --

-- object: public.apps | type: TABLE --
-- DROP TABLE IF EXISTS public.apps CASCADE;
CREATE TABLE public.apps(
	app varchar(10) NOT NULL,
	app_caption varchar(100) NOT NULL,
	app_description text,
	CONSTRAINT pk_app PRIMARY KEY (app)

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
	module varchar(20) NOT NULL,
	app_apps varchar(10) NOT NULL,
	module_description text,
	CONSTRAINT pk_modules PRIMARY KEY (module)

);
-- ddl-end --
ALTER TABLE public.modules OWNER TO postgres;
-- ddl-end --

-- object: public.actions | type: TABLE --
-- DROP TABLE IF EXISTS public.actions CASCADE;
CREATE TABLE public.actions(
	module_modules varchar(20) NOT NULL,
	action varchar(30) NOT NULL,
	bit_value smallint NOT NULL,
	action_description text,
	CONSTRAINT pk_actions PRIMARY KEY (module_modules,action)

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
	actions_access_grant integer NOT NULL,
	actions_access_deny integer NOT NULL,
	CONSTRAINT pk_users_privileges PRIMARY KEY (user_id_users)

);
-- ddl-end --
ALTER TABLE public.users_privileges OWNER TO postgres;
-- ddl-end --

-- object: public.groups_privileges | type: TABLE --
-- DROP TABLE IF EXISTS public.groups_privileges CASCADE;
CREATE TABLE public.groups_privileges(
	group_id_groups integer NOT NULL,
	actions_access_grant integer NOT NULL,
	actions_access_deny integer NOT NULL,
	CONSTRAINT pk_groups_privileges PRIMARY KEY (group_id_groups)

);
-- ddl-end --
ALTER TABLE public.groups_privileges OWNER TO postgres;
-- ddl-end --

-- object: public.users_scope | type: TABLE --
-- DROP TABLE IF EXISTS public.users_scope CASCADE;
CREATE TABLE public.users_scope(
	user_id_users smallint NOT NULL,
	target_table varchar(100) NOT NULL,
	scope_rule text NOT NULL,
	CONSTRAINT pk_users_scope PRIMARY KEY (user_id_users,target_table)

);
-- ddl-end --
ALTER TABLE public.users_scope OWNER TO postgres;
-- ddl-end --

-- object: public.groups_scope | type: TABLE --
-- DROP TABLE IF EXISTS public.groups_scope CASCADE;
CREATE TABLE public.groups_scope(
	group_id_groups integer NOT NULL,
	target_table varchar(100) NOT NULL,
	scope_rule text NOT NULL,
	CONSTRAINT pk_groups_scope PRIMARY KEY (group_id_groups,target_table)

);
-- ddl-end --
ALTER TABLE public.groups_scope OWNER TO postgres;
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

-- object: fk_app_name_apps | type: CONSTRAINT --
-- ALTER TABLE public.modules DROP CONSTRAINT IF EXISTS fk_app_name_apps CASCADE;
ALTER TABLE public.modules ADD CONSTRAINT fk_app_name_apps FOREIGN KEY (app_apps)
REFERENCES public.apps (app) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_module_modules_modules | type: CONSTRAINT --
-- ALTER TABLE public.actions DROP CONSTRAINT IF EXISTS fk_module_modules_modules CASCADE;
ALTER TABLE public.actions ADD CONSTRAINT fk_module_modules_modules FOREIGN KEY (module_modules)
REFERENCES public.modules (module) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_users_privileges_users | type: CONSTRAINT --
-- ALTER TABLE public.users_privileges DROP CONSTRAINT IF EXISTS fk_users_privileges_users CASCADE;
ALTER TABLE public.users_privileges ADD CONSTRAINT fk_users_privileges_users FOREIGN KEY (user_id_users)
REFERENCES public.users (user_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_groups_privileges_groups | type: CONSTRAINT --
-- ALTER TABLE public.groups_privileges DROP CONSTRAINT IF EXISTS fk_groups_privileges_groups CASCADE;
ALTER TABLE public.groups_privileges ADD CONSTRAINT fk_groups_privileges_groups FOREIGN KEY (group_id_groups)
REFERENCES public.groups (group_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_users_scope_users | type: CONSTRAINT --
-- ALTER TABLE public.users_scope DROP CONSTRAINT IF EXISTS fk_users_scope_users CASCADE;
ALTER TABLE public.users_scope ADD CONSTRAINT fk_users_scope_users FOREIGN KEY (user_id_users)
REFERENCES public.users (user_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_groups_scope_groups | type: CONSTRAINT --
-- ALTER TABLE public.groups_scope DROP CONSTRAINT IF EXISTS fk_groups_scope_groups CASCADE;
ALTER TABLE public.groups_scope ADD CONSTRAINT fk_groups_scope_groups FOREIGN KEY (group_id_groups)
REFERENCES public.groups (group_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


