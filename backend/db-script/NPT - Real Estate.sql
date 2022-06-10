CREATE TABLE "account" (
  "fullname" varchar,
  "email" varchar PRIMARY KEY,
  "password" char(256),
  "wallet_address" varchar
);

CREATE TABLE "property" (
  "id" int PRIMARY KEY,
  "seller" varchar,
  "title" varchar,
  "total_supply" int,
  "contract_id" varchar,
  "status" int
);

CREATE TABLE "property_meta" (
  "property_id" int PRIMARY KEY,
  "land_area" int,
  "construct_area" int,
  "purpose_id" int,
  "legal_id" int,
  "invest_end_date" timestamp,
  "apr" int,
  "uses_form_id" int,
  "video_path" varchar,
  "description" text,
  "pdf_slide" varchar
);

CREATE TABLE "property_image" (
  "id" int PRIMARY KEY,
  "property_id" int,
  "path" varchar,
  "is_primary" bool
);

CREATE TABLE "transaction" (
  "id" int PRIMARY KEY,
  "email" varchar,
  "property_id" int,
  "amount" int,
  "created_date" date
);

ALTER TABLE "property" ADD FOREIGN KEY ("seller") REFERENCES "account" ("email");
ALTER TABLE "property" ADD FOREIGN KEY ("id") REFERENCES "property_meta" ("property_id");
ALTER TABLE "property" ADD FOREIGN KEY ("id") REFERENCES "property_image" ("property_id");
ALTER TABLE "transaction" ADD FOREIGN KEY ("email") REFERENCES "account" ("email");
ALTER TABLE "transaction" ADD FOREIGN KEY ("property_id") REFERENCES "property" ("id");
