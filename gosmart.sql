-- Database: gosmart

-- DROP DATABASE IF EXISTS gosmart;

CREATE DATABASE gosmart
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_Indonesia.1252'
    LC_CTYPE = 'English_Indonesia.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS public.assignments
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    is_announcement boolean,
    is_material boolean,
    is_task boolean,
    name character varying(255) COLLATE pg_catalog."default",
    courses_id character varying(255) COLLATE pg_catalog."default",
    due_date timestamp without time zone,
    post_date timestamp without time zone,
    CONSTRAINT assignments_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.attachments
(
    id integer NOT NULL DEFAULT nextval('attachments_id_seq'::regclass),
    is_from_student boolean,
    is_from_teacher boolean,
    name character varying(255) COLLATE pg_catalog."default",
    size bigint,
    type character varying(255) COLLATE pg_catalog."default",
    url character varying(255) COLLATE pg_catalog."default",
    assignments_id character varying(255) COLLATE pg_catalog."default",
    enrollments_id character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT attachments_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.courses
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    image character varying(255) COLLATE pg_catalog."default",
    is_archived boolean,
    name character varying(255) COLLATE pg_catalog."default",
    schedule character varying(255) COLLATE pg_catalog."default",
    theme character varying(255) COLLATE pg_catalog."default",
    users_email character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT courses_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.enrollments
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    enrollment_date timestamp without time zone,
    is_student boolean,
    is_teacher boolean,
    courses_id character varying(255) COLLATE pg_catalog."default",
    users_email character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT enrollments_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.grades
(
    id integer NOT NULL DEFAULT nextval('grades_id_seq'::regclass),
    grade integer,
    assignments_id character varying(255) COLLATE pg_catalog."default",
    users_email character varying(255) COLLATE pg_catalog."default",
    courses_id character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT grades_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.students
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    users_email character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT students_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.teachers
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    users_email character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT teachers_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.token
(
    token character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT token_pkey PRIMARY KEY (token)
);

CREATE TABLE IF NOT EXISTS public.users
(
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    full_name character varying(255) COLLATE pg_catalog."default",
    image character varying(255) COLLATE pg_catalog."default",
    is_verified boolean,
    password character varying(255) COLLATE pg_catalog."default",
    phone_number character varying(255) COLLATE pg_catalog."default",
    roles character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (email)
);

ALTER TABLE IF EXISTS public.assignments
    ADD CONSTRAINT fk6p3jekrl5k1gjmtkjf3js2acc FOREIGN KEY (courses_id)
    REFERENCES public.courses (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.attachments
    ADD CONSTRAINT fkgjrb3v9fiq0c7my6tmpwphu40 FOREIGN KEY (assignments_id)
    REFERENCES public.assignments (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.attachments
    ADD CONSTRAINT fklo1cgxxxkpn1klvjq3turv5gb FOREIGN KEY (enrollments_id)
    REFERENCES public.enrollments (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.courses
    ADD CONSTRAINT fk1nwbhxuhg8rl9at7m6gc90k3d FOREIGN KEY (users_email)
    REFERENCES public.users (email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.enrollments
    ADD CONSTRAINT fkeas9r76y8lf7tvcdbtchpr7y2 FOREIGN KEY (courses_id)
    REFERENCES public.courses (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.enrollments
    ADD CONSTRAINT fkhvandhfjfjhfcsicbdpm8njyl FOREIGN KEY (users_email)
    REFERENCES public.users (email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.grades
    ADD CONSTRAINT fk3shyqil15uebawfmme3tyu7le FOREIGN KEY (courses_id)
    REFERENCES public.courses (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.grades
    ADD CONSTRAINT fk4dhiqakr1ihll0qct903c84l1 FOREIGN KEY (users_email)
    REFERENCES public.users (email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.grades
    ADD CONSTRAINT fkcg9c5gub8ehq1bsm5oln90ysc FOREIGN KEY (assignments_id)
    REFERENCES public.assignments (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.students
    ADD CONSTRAINT fk1s5yd6kj59vn8ex56mra5txya FOREIGN KEY (users_email)
    REFERENCES public.users (email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.teachers
    ADD CONSTRAINT fk3m7ypmgi0f3walcq4keo4bl6a FOREIGN KEY (users_email)
    REFERENCES public.users (email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;
