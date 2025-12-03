ALTER TABLE "customers" RENAME COLUMN "last_Name" TO "last_name";--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "first_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "first_Name";