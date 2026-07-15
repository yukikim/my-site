import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "posts_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_sessions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_sessions" CASCADE;
  DROP TABLE "_posts_v_version_sessions" CASCADE;
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_posts_fk";
  
  DROP INDEX "posts_email_idx";
  DROP INDEX "_posts_v_version_version_email_idx";
  DROP INDEX "payload_preferences_rels_posts_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  ALTER TABLE "posts" DROP COLUMN "email";
  ALTER TABLE "posts" DROP COLUMN "reset_password_token";
  ALTER TABLE "posts" DROP COLUMN "reset_password_expiration";
  ALTER TABLE "posts" DROP COLUMN "salt";
  ALTER TABLE "posts" DROP COLUMN "hash";
  ALTER TABLE "posts" DROP COLUMN "login_attempts";
  ALTER TABLE "posts" DROP COLUMN "lock_until";
  ALTER TABLE "_posts_v" DROP COLUMN "version_email";
  ALTER TABLE "_posts_v" DROP COLUMN "version_reset_password_token";
  ALTER TABLE "_posts_v" DROP COLUMN "version_reset_password_expiration";
  ALTER TABLE "_posts_v" DROP COLUMN "version_salt";
  ALTER TABLE "_posts_v" DROP COLUMN "version_hash";
  ALTER TABLE "_posts_v" DROP COLUMN "version_login_attempts";
  ALTER TABLE "_posts_v" DROP COLUMN "version_lock_until";
  ALTER TABLE "payload_preferences_rels" DROP COLUMN "posts_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "posts_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_posts_v_version_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "posts" ADD COLUMN "email" varchar;
  ALTER TABLE "posts" ADD COLUMN "reset_password_token" varchar;
  ALTER TABLE "posts" ADD COLUMN "reset_password_expiration" timestamp(3) with time zone;
  ALTER TABLE "posts" ADD COLUMN "salt" varchar;
  ALTER TABLE "posts" ADD COLUMN "hash" varchar;
  ALTER TABLE "posts" ADD COLUMN "login_attempts" numeric DEFAULT 0;
  ALTER TABLE "posts" ADD COLUMN "lock_until" timestamp(3) with time zone;
  ALTER TABLE "_posts_v" ADD COLUMN "version_email" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_reset_password_token" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_reset_password_expiration" timestamp(3) with time zone;
  ALTER TABLE "_posts_v" ADD COLUMN "version_salt" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_hash" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_login_attempts" numeric DEFAULT 0;
  ALTER TABLE "_posts_v" ADD COLUMN "version_lock_until" timestamp(3) with time zone;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "posts_sessions" ADD CONSTRAINT "posts_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_sessions" ADD CONSTRAINT "_posts_v_version_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_sessions_order_idx" ON "posts_sessions" USING btree ("_order");
  CREATE INDEX "posts_sessions_parent_id_idx" ON "posts_sessions" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_sessions_order_idx" ON "_posts_v_version_sessions" USING btree ("_order");
  CREATE INDEX "_posts_v_version_sessions_parent_id_idx" ON "_posts_v_version_sessions" USING btree ("_parent_id");
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "posts_email_idx" ON "posts" USING btree ("email");
  CREATE INDEX "_posts_v_version_version_email_idx" ON "_posts_v" USING btree ("version_email");
  CREATE INDEX "payload_preferences_rels_posts_id_idx" ON "payload_preferences_rels" USING btree ("posts_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";`)
}
