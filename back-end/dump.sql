--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name character varying NOT NULL
);


--
-- Name: country_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.country_id_seq OWNED BY public.countries.id;


--
-- Name: rarities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rarities (
    id integer NOT NULL,
    level character varying(255) NOT NULL
);


--
-- Name: rarity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rarity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: rarity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rarity_id_seq OWNED BY public.rarities.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: stickers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stickers (
    id integer NOT NULL,
    "countryId" integer NOT NULL,
    "stickerNumber" integer NOT NULL,
    "rarityId" integer NOT NULL
);


--
-- Name: stickers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stickers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stickers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stickers_id_seq OWNED BY public.stickers.id;


--
-- Name: userStickers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."userStickers" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "stickerId" integer NOT NULL,
    amount integer NOT NULL
);


--
-- Name: userStickers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."userStickers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: userStickers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."userStickers_id_seq" OWNED BY public."userStickers".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.country_id_seq'::regclass);


--
-- Name: rarities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rarities ALTER COLUMN id SET DEFAULT nextval('public.rarity_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: stickers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stickers ALTER COLUMN id SET DEFAULT nextval('public.stickers_id_seq'::regclass);


--
-- Name: userStickers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userStickers" ALTER COLUMN id SET DEFAULT nextval('public."userStickers_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.countries VALUES (1, 'QAT');
INSERT INTO public.countries VALUES (2, 'ECU');
INSERT INTO public.countries VALUES (3, 'SEN');
INSERT INTO public.countries VALUES (4, 'NED');
INSERT INTO public.countries VALUES (5, 'ENG');
INSERT INTO public.countries VALUES (6, 'IRN');
INSERT INTO public.countries VALUES (7, 'USA');
INSERT INTO public.countries VALUES (8, 'WAL');
INSERT INTO public.countries VALUES (9, 'ARG');
INSERT INTO public.countries VALUES (10, 'KSA');
INSERT INTO public.countries VALUES (11, 'MEX');
INSERT INTO public.countries VALUES (12, 'POL');
INSERT INTO public.countries VALUES (13, 'FRA');
INSERT INTO public.countries VALUES (14, 'AUS');
INSERT INTO public.countries VALUES (15, 'DEN');
INSERT INTO public.countries VALUES (16, 'TUN');
INSERT INTO public.countries VALUES (17, 'ESP');
INSERT INTO public.countries VALUES (18, 'CRC');
INSERT INTO public.countries VALUES (19, 'GER');
INSERT INTO public.countries VALUES (20, 'JPN');
INSERT INTO public.countries VALUES (21, 'BEL');
INSERT INTO public.countries VALUES (22, 'CAN');
INSERT INTO public.countries VALUES (23, 'MAR');
INSERT INTO public.countries VALUES (24, 'CRO');
INSERT INTO public.countries VALUES (25, 'BRA');
INSERT INTO public.countries VALUES (26, 'SRB');
INSERT INTO public.countries VALUES (27, 'SUI');
INSERT INTO public.countries VALUES (28, 'CMR');
INSERT INTO public.countries VALUES (29, 'POR');
INSERT INTO public.countries VALUES (30, 'GHA');
INSERT INTO public.countries VALUES (31, 'URU');
INSERT INTO public.countries VALUES (32, 'KOR');
INSERT INTO public.countries VALUES (33, 'FWC');
INSERT INTO public.countries VALUES (34, 'C');


--
-- Data for Name: rarities; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.rarities VALUES (1, 'regular');
INSERT INTO public.rarities VALUES (2, 'rookie');
INSERT INTO public.rarities VALUES (3, 'bronze');
INSERT INTO public.rarities VALUES (4, 'silver');
INSERT INTO public.rarities VALUES (5, 'gold');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, '47fb44da-2c4d-4aa2-8b36-ae4c4ccd8c55');


--
-- Data for Name: stickers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.stickers VALUES (1, 1, 1, 1);
INSERT INTO public.stickers VALUES (2, 1, 2, 1);
INSERT INTO public.stickers VALUES (3, 1, 3, 1);
INSERT INTO public.stickers VALUES (4, 1, 20, 1);
INSERT INTO public.stickers VALUES (5, 1, 19, 1);
INSERT INTO public.stickers VALUES (6, 1, 18, 1);
INSERT INTO public.stickers VALUES (7, 1, 17, 1);
INSERT INTO public.stickers VALUES (8, 1, 16, 1);
INSERT INTO public.stickers VALUES (9, 1, 15, 1);
INSERT INTO public.stickers VALUES (10, 1, 14, 1);
INSERT INTO public.stickers VALUES (11, 1, 13, 1);
INSERT INTO public.stickers VALUES (12, 1, 12, 1);
INSERT INTO public.stickers VALUES (13, 1, 11, 1);
INSERT INTO public.stickers VALUES (14, 1, 10, 1);
INSERT INTO public.stickers VALUES (15, 1, 9, 1);
INSERT INTO public.stickers VALUES (16, 1, 8, 1);
INSERT INTO public.stickers VALUES (17, 1, 7, 1);
INSERT INTO public.stickers VALUES (18, 1, 6, 1);
INSERT INTO public.stickers VALUES (19, 1, 5, 1);
INSERT INTO public.stickers VALUES (20, 1, 4, 1);


--
-- Data for Name: userStickers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."userStickers" VALUES (2, 1, 3, 1);
INSERT INTO public."userStickers" VALUES (1, 1, 1, 3);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Vini10', 'vini@copa.com', '$2b$10$NpM.BAvhKNPZZT4Sd7pp.eTfwr7TN5BFquzKjKcvNYzWTyS8SbIou');
INSERT INTO public.users VALUES (2, 'Juninho', 'juninho@copa.com', '$2b$10$yf/YmRbxVF/puvFDi7bMUuPbyIXw2YFW0B7pPLkG9dvfieLkPjJ.W');


--
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.country_id_seq', 34, true);


--
-- Name: rarity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rarity_id_seq', 5, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);


--
-- Name: stickers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stickers_id_seq', 20, true);


--
-- Name: userStickers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."userStickers_id_seq"', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: countries country_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);


--
-- Name: rarities rarity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rarities
    ADD CONSTRAINT rarity_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: stickers stickers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stickers
    ADD CONSTRAINT stickers_pkey PRIMARY KEY (id);


--
-- Name: userStickers userStickers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userStickers"
    ADD CONSTRAINT "userStickers_pkey" PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_userid_fkey FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: stickers stickers_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stickers
    ADD CONSTRAINT "stickers_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public.countries(id) ON DELETE CASCADE;


--
-- Name: stickers stickers_rarityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stickers
    ADD CONSTRAINT "stickers_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES public.rarities(id) ON DELETE CASCADE;


--
-- Name: userStickers userStickers_stickerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userStickers"
    ADD CONSTRAINT "userStickers_stickerId_fkey" FOREIGN KEY ("stickerId") REFERENCES public.stickers(id) ON DELETE CASCADE;


--
-- Name: userStickers userStickers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userStickers"
    ADD CONSTRAINT "userStickers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

