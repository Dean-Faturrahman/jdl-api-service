-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "heroes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "heroes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "hero_id" INTEGER NOT NULL,

    CONSTRAINT "hero_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_translations" (
    "id" SERIAL NOT NULL,
    "hero_id" INTEGER NOT NULL,
    "language_code" VARCHAR(5) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hero_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "id" SERIAL NOT NULL,
    "quotes" TEXT NOT NULL,
    "author" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonies" (
    "id" SERIAL NOT NULL,
    "testimony" TEXT NOT NULL,
    "author" TEXT,
    "is_shown" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "trip_id" INTEGER,

    CONSTRAINT "testimonies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" SERIAL NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "price" DOUBLE PRECISION,
    "discount" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_highlight" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_translations" (
    "id" SERIAL NOT NULL,
    "language_code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "trip_id" INTEGER NOT NULL,

    CONSTRAINT "trip_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "trip_id" INTEGER NOT NULL,

    CONSTRAINT "trip_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_facilities" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,

    CONSTRAINT "trip_facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_facility_translations" (
    "id" SERIAL NOT NULL,
    "language_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "facility_id" INTEGER NOT NULL,

    CONSTRAINT "trip_facility_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_itinerary_items" (
    "id" SERIAL NOT NULL,
    "time" TEXT,
    "trip_id" INTEGER NOT NULL,

    CONSTRAINT "trip_itinerary_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_itinerary_item_translations" (
    "id" SERIAL NOT NULL,
    "language_code" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "itinerary_item_id" INTEGER NOT NULL,

    CONSTRAINT "trip_itinerary_item_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_terms" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,

    CONSTRAINT "trip_terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_term_translations" (
    "id" SERIAL NOT NULL,
    "language_code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "term_id" INTEGER NOT NULL,

    CONSTRAINT "trip_term_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_profiles" (
    "id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "book_url" TEXT,
    "facebook_url" TEXT,
    "instagram_url" TEXT,
    "tiktok_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_profile_translations" (
    "id" SERIAL NOT NULL,
    "language_code" TEXT NOT NULL,
    "philosophy" TEXT,
    "values" TEXT,
    "background" TEXT,
    "vision" TEXT,
    "mission" TEXT,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "company_profile_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "company_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "photo_url" TEXT,
    "facebook_url" TEXT,
    "instagram_url" TEXT,
    "tiktok_url" TEXT,
    "linkedin_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "hero_translations_hero_id_language_code_key" ON "hero_translations"("hero_id", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "trip_translations_trip_id_language_code_key" ON "trip_translations"("trip_id", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "trip_facility_translations_facility_id_language_code_key" ON "trip_facility_translations"("facility_id", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "trip_itinerary_item_translations_itinerary_item_id_language_key" ON "trip_itinerary_item_translations"("itinerary_item_id", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "trip_term_translations_term_id_language_code_key" ON "trip_term_translations"("term_id", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "company_profile_translations_profile_id_language_code_key" ON "company_profile_translations"("profile_id", "language_code");

-- AddForeignKey
ALTER TABLE "hero_images" ADD CONSTRAINT "hero_images_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_translations" ADD CONSTRAINT "hero_translations_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonies" ADD CONSTRAINT "testimonies_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_translations" ADD CONSTRAINT "trip_translations_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_images" ADD CONSTRAINT "trip_images_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_facilities" ADD CONSTRAINT "trip_facilities_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_facility_translations" ADD CONSTRAINT "trip_facility_translations_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "trip_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_itinerary_items" ADD CONSTRAINT "trip_itinerary_items_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_itinerary_item_translations" ADD CONSTRAINT "trip_itinerary_item_translations_itinerary_item_id_fkey" FOREIGN KEY ("itinerary_item_id") REFERENCES "trip_itinerary_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_terms" ADD CONSTRAINT "trip_terms_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_term_translations" ADD CONSTRAINT "trip_term_translations_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "trip_terms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_profile_translations" ADD CONSTRAINT "company_profile_translations_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "company_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_images" ADD CONSTRAINT "company_images_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "company_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
