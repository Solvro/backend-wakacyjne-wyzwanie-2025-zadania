
\restrict NZzJ3aDNwNmoipyl9gurZFGH67kg7d8Ihz4HQAcaxHTW1azNtJMXeAbUTeRgofe

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN',
    'COORDINATOR'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: Sex; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Sex" AS ENUM (
    'FEMALE',
    'MALE',
    'OTHER'
);


ALTER TYPE public."Sex" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Expense; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Expense" (
    id integer NOT NULL,
    amount double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "tripParticipantId" integer NOT NULL
);


ALTER TABLE public."Expense" OWNER TO postgres;

--
-- Name: Expense_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Expense_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Expense_id_seq" OWNER TO postgres;

--
-- Name: Expense_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Expense_id_seq" OWNED BY public."Expense".id;


--
-- Name: Participant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Participant" (
    id integer NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    sex public."Sex",
    age integer NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Participant" OWNER TO postgres;

--
-- Name: Participant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Participant_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Participant_id_seq" OWNER TO postgres;

--
-- Name: Participant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Participant_id_seq" OWNED BY public."Participant".id;


--
-- Name: Trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Trip" (
    id integer NOT NULL,
    name text NOT NULL,
    start timestamp(3) without time zone NOT NULL,
    "end" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Trip" OWNER TO postgres;

--
-- Name: TripParticipant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TripParticipant" (
    id integer NOT NULL,
    "tripId" integer NOT NULL,
    "participantId" integer NOT NULL,
    "joinedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."TripParticipant" OWNER TO postgres;

--
-- Name: TripParticipant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TripParticipant_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TripParticipant_id_seq" OWNER TO postgres;

--
-- Name: TripParticipant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TripParticipant_id_seq" OWNED BY public."TripParticipant".id;


--
-- Name: Trip_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Trip_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Trip_id_seq" OWNER TO postgres;

--
-- Name: Trip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Trip_id_seq" OWNED BY public."Trip".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Expense id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expense" ALTER COLUMN id SET DEFAULT nextval('public."Expense_id_seq"'::regclass);


--
-- Name: Participant id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Participant" ALTER COLUMN id SET DEFAULT nextval('public."Participant_id_seq"'::regclass);


--
-- Name: Trip id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip" ALTER COLUMN id SET DEFAULT nextval('public."Trip_id_seq"'::regclass);


--
-- Name: TripParticipant id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TripParticipant" ALTER COLUMN id SET DEFAULT nextval('public."TripParticipant_id_seq"'::regclass);


--
-- Name: Expense Expense_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expense"
    ADD CONSTRAINT "Expense_pkey" PRIMARY KEY (id);


--
-- Name: Participant Participant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_pkey" PRIMARY KEY (id);


--
-- Name: TripParticipant TripParticipant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TripParticipant"
    ADD CONSTRAINT "TripParticipant_pkey" PRIMARY KEY (id);


--
-- Name: Trip Trip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (email);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Participant_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Participant_email_key" ON public."Participant" USING btree (email);


--
-- Name: Expense Expense_tripParticipantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expense"
    ADD CONSTRAINT "Expense_tripParticipantId_fkey" FOREIGN KEY ("tripParticipantId") REFERENCES public."TripParticipant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Participant Participant_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_email_fkey" FOREIGN KEY (email) REFERENCES public."User"(email) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TripParticipant TripParticipant_participantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TripParticipant"
    ADD CONSTRAINT "TripParticipant_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES public."Participant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TripParticipant TripParticipant_tripId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TripParticipant"
    ADD CONSTRAINT "TripParticipant_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES public."Trip"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict NZzJ3aDNwNmoipyl9gurZFGH67kg7d8Ihz4HQAcaxHTW1azNtJMXeAbUTeRgofe

