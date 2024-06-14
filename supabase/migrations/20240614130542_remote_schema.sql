
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

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."Admin" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "User" "uuid",
    "since" timestamp with time zone DEFAULT "now"(),
    "role" "text" DEFAULT 'default'::"text"
);

ALTER TABLE "public"."Admin" OWNER TO "postgres";

COMMENT ON TABLE "public"."Admin" IS 'Admin user';

CREATE TABLE IF NOT EXISTS "public"."Company" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "Owner" "uuid",
    "registered_at" "date",
    "name" "text",
    "description" "text" DEFAULT ''::"text",
    "email" "text",
    "address" "text"
);

ALTER TABLE "public"."Company" OWNER TO "postgres";

COMMENT ON TABLE "public"."Company" IS 'User company';

CREATE TABLE IF NOT EXISTS "public"."Homework" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "Professor" "uuid",
    "Class" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "text" DEFAULT ''::"text",
    "description" "text",
    "end_at" "date"
);

ALTER TABLE "public"."Homework" OWNER TO "postgres";

COMMENT ON TABLE "public"."Homework" IS 'Student homework';

CREATE TABLE IF NOT EXISTS "public"."Professor" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "User" "uuid",
    "full_name" "text",
    "email" "text"
);

ALTER TABLE "public"."Professor" OWNER TO "postgres";

COMMENT ON TABLE "public"."Professor" IS 'School professor';

CREATE TABLE IF NOT EXISTS "public"."School" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "full_name" "text",
    "catchword" "text" DEFAULT ''::"text",
    "description" "text"
);

ALTER TABLE "public"."School" OWNER TO "postgres";

COMMENT ON TABLE "public"."School" IS 'User school';

CREATE TABLE IF NOT EXISTS "public"."SchoolClass" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "School" "uuid",
    "Main_professor" "uuid",
    "name" "text"
);

ALTER TABLE "public"."SchoolClass" OWNER TO "postgres";

COMMENT ON TABLE "public"."SchoolClass" IS 'School class';

CREATE TABLE IF NOT EXISTS "public"."SchoolCourse" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "Professor" "uuid",
    "School" "uuid",
    "begin" timestamp without time zone,
    "end" timestamp without time zone,
    "is_maintained" boolean,
    "place" "text"
);

ALTER TABLE "public"."SchoolCourse" OWNER TO "postgres";

COMMENT ON TABLE "public"."SchoolCourse" IS 'School course';

CREATE TABLE IF NOT EXISTS "public"."SchoolMod" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "User" "uuid",
    "School" "uuid",
    "role" "text"
);

ALTER TABLE "public"."SchoolMod" OWNER TO "postgres";

COMMENT ON TABLE "public"."SchoolMod" IS 'School moderator';

CREATE TABLE IF NOT EXISTS "public"."SchoolPost" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "School" "uuid",
    "illustration" "text",
    "text" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "post_path" "text",
    "bg_color" "text"
);

ALTER TABLE "public"."SchoolPost" OWNER TO "postgres";

COMMENT ON TABLE "public"."SchoolPost" IS 'School post';

CREATE TABLE IF NOT EXISTS "public"."SchoolRelation" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "User" "uuid",
    "School" "uuid",
    "type" "text",
    "class" "uuid"
);

ALTER TABLE "public"."SchoolRelation" OWNER TO "postgres";

COMMENT ON TABLE "public"."SchoolRelation" IS 'School relation';

CREATE TABLE IF NOT EXISTS "public"."Strip" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "is_active" boolean,
    "title" "text",
    "text" "text" DEFAULT ''::"text",
    "discount_percentage" double precision
);

ALTER TABLE "public"."Strip" OWNER TO "postgres";

COMMENT ON TABLE "public"."Strip" IS 'Website strip';

CREATE TABLE IF NOT EXISTS "public"."Testimonial" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "Author" "uuid",
    "text" "text"
);

ALTER TABLE "public"."Testimonial" OWNER TO "postgres";

COMMENT ON TABLE "public"."Testimonial" IS 'User testimonial';

CREATE TABLE IF NOT EXISTS "public"."User" (
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "full_name" "text",
    "type" "text",
    "email" "text",
    "phone" "text",
    "birth_date" "date",
    "is_premium" boolean,
    "position" "text" DEFAULT ''::"text"
);

ALTER TABLE "public"."User" OWNER TO "postgres";

COMMENT ON TABLE "public"."User" IS 'Website user';

ALTER TABLE ONLY "public"."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."Company"
    ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."Homework"
    ADD CONSTRAINT "Homework_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."Professor"
    ADD CONSTRAINT "Professor_email_key" UNIQUE ("email");

ALTER TABLE ONLY "public"."Professor"
    ADD CONSTRAINT "Professor_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."SchoolClass"
    ADD CONSTRAINT "SchoolClass_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."SchoolCourse"
    ADD CONSTRAINT "SchoolCourse_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."SchoolMod"
    ADD CONSTRAINT "SchoolMod_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."SchoolPost"
    ADD CONSTRAINT "SchoolPost_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."SchoolRelation"
    ADD CONSTRAINT "SchoolRelation_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."School"
    ADD CONSTRAINT "School_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."Strip"
    ADD CONSTRAINT "Strip_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."Testimonial"
    ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "User_email_key" UNIQUE ("email");

ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "User_phone_key" UNIQUE ("phone");

ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("uid");

ALTER TABLE ONLY "public"."Admin"
    ADD CONSTRAINT "Admin_User_fkey" FOREIGN KEY ("User") REFERENCES "public"."User"("uid");

ALTER TABLE ONLY "public"."Company"
    ADD CONSTRAINT "Company_Owner_fkey" FOREIGN KEY ("Owner") REFERENCES "public"."User"("uid");

ALTER TABLE ONLY "public"."Homework"
    ADD CONSTRAINT "Homework_Class_fkey" FOREIGN KEY ("Class") REFERENCES "public"."SchoolClass"("uid");

ALTER TABLE ONLY "public"."Homework"
    ADD CONSTRAINT "Homework_Professor_fkey" FOREIGN KEY ("Professor") REFERENCES "public"."Professor"("uid");

ALTER TABLE ONLY "public"."Professor"
    ADD CONSTRAINT "Professor_User_fkey" FOREIGN KEY ("User") REFERENCES "public"."User"("uid");

ALTER TABLE ONLY "public"."SchoolClass"
    ADD CONSTRAINT "SchoolClass_Main_professor_fkey" FOREIGN KEY ("Main_professor") REFERENCES "public"."Professor"("uid");

ALTER TABLE ONLY "public"."SchoolClass"
    ADD CONSTRAINT "SchoolClass_School_fkey" FOREIGN KEY ("School") REFERENCES "public"."School"("uid");

ALTER TABLE ONLY "public"."SchoolCourse"
    ADD CONSTRAINT "SchoolCourse_Professor_fkey" FOREIGN KEY ("Professor") REFERENCES "public"."User"("uid");

ALTER TABLE ONLY "public"."SchoolCourse"
    ADD CONSTRAINT "SchoolCourse_School_fkey" FOREIGN KEY ("School") REFERENCES "public"."School"("uid");

ALTER TABLE ONLY "public"."SchoolMod"
    ADD CONSTRAINT "SchoolMod_School_fkey" FOREIGN KEY ("School") REFERENCES "public"."School"("uid");

ALTER TABLE ONLY "public"."SchoolMod"
    ADD CONSTRAINT "SchoolMod_User_fkey" FOREIGN KEY ("User") REFERENCES "public"."User"("uid");

ALTER TABLE ONLY "public"."SchoolPost"
    ADD CONSTRAINT "SchoolPost_School_fkey" FOREIGN KEY ("School") REFERENCES "public"."School"("uid");

ALTER TABLE ONLY "public"."SchoolRelation"
    ADD CONSTRAINT "SchoolRelation_School_fkey" FOREIGN KEY ("School") REFERENCES "public"."School"("uid");

ALTER TABLE ONLY "public"."SchoolRelation"
    ADD CONSTRAINT "SchoolRelation_User_fkey" FOREIGN KEY ("User") REFERENCES "public"."User"("uid");

ALTER TABLE ONLY "public"."SchoolRelation"
    ADD CONSTRAINT "SchoolRelation_class_fkey" FOREIGN KEY ("class") REFERENCES "public"."SchoolClass"("uid");

ALTER TABLE ONLY "public"."Testimonial"
    ADD CONSTRAINT "Testimonial_Author_fkey" FOREIGN KEY ("Author") REFERENCES "public"."User"("uid");

ALTER TABLE "public"."Admin" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Company" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Homework" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Professor" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."School" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."SchoolClass" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."SchoolCourse" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."SchoolMod" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."SchoolPost" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."SchoolRelation" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Strip" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Testimonial" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."User" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."Admin" TO "anon";
GRANT ALL ON TABLE "public"."Admin" TO "authenticated";
GRANT ALL ON TABLE "public"."Admin" TO "service_role";

GRANT ALL ON TABLE "public"."Company" TO "anon";
GRANT ALL ON TABLE "public"."Company" TO "authenticated";
GRANT ALL ON TABLE "public"."Company" TO "service_role";

GRANT ALL ON TABLE "public"."Homework" TO "anon";
GRANT ALL ON TABLE "public"."Homework" TO "authenticated";
GRANT ALL ON TABLE "public"."Homework" TO "service_role";

GRANT ALL ON TABLE "public"."Professor" TO "anon";
GRANT ALL ON TABLE "public"."Professor" TO "authenticated";
GRANT ALL ON TABLE "public"."Professor" TO "service_role";

GRANT ALL ON TABLE "public"."School" TO "anon";
GRANT ALL ON TABLE "public"."School" TO "authenticated";
GRANT ALL ON TABLE "public"."School" TO "service_role";

GRANT ALL ON TABLE "public"."SchoolClass" TO "anon";
GRANT ALL ON TABLE "public"."SchoolClass" TO "authenticated";
GRANT ALL ON TABLE "public"."SchoolClass" TO "service_role";

GRANT ALL ON TABLE "public"."SchoolCourse" TO "anon";
GRANT ALL ON TABLE "public"."SchoolCourse" TO "authenticated";
GRANT ALL ON TABLE "public"."SchoolCourse" TO "service_role";

GRANT ALL ON TABLE "public"."SchoolMod" TO "anon";
GRANT ALL ON TABLE "public"."SchoolMod" TO "authenticated";
GRANT ALL ON TABLE "public"."SchoolMod" TO "service_role";

GRANT ALL ON TABLE "public"."SchoolPost" TO "anon";
GRANT ALL ON TABLE "public"."SchoolPost" TO "authenticated";
GRANT ALL ON TABLE "public"."SchoolPost" TO "service_role";

GRANT ALL ON TABLE "public"."SchoolRelation" TO "anon";
GRANT ALL ON TABLE "public"."SchoolRelation" TO "authenticated";
GRANT ALL ON TABLE "public"."SchoolRelation" TO "service_role";

GRANT ALL ON TABLE "public"."Strip" TO "anon";
GRANT ALL ON TABLE "public"."Strip" TO "authenticated";
GRANT ALL ON TABLE "public"."Strip" TO "service_role";

GRANT ALL ON TABLE "public"."Testimonial" TO "anon";
GRANT ALL ON TABLE "public"."Testimonial" TO "authenticated";
GRANT ALL ON TABLE "public"."Testimonial" TO "service_role";

GRANT ALL ON TABLE "public"."User" TO "anon";
GRANT ALL ON TABLE "public"."User" TO "authenticated";
GRANT ALL ON TABLE "public"."User" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
