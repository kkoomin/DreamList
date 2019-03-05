# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_03_05_114434) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "airport_locators", force: :cascade do |t|
    t.bigint "destination_id"
    t.bigint "airport_id"
    t.boolean "inDestination"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["airport_id"], name: "index_airport_locators_on_airport_id"
    t.index ["destination_id"], name: "index_airport_locators_on_destination_id"
  end

  create_table "airports", force: :cascade do |t|
    t.string "name"
    t.string "iata_code"
    t.string "iso_country"
    t.string "iso_region"
    t.string "municipality"
    t.string "latitude"
    t.string "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "buzzwords", force: :cascade do |t|
    t.string "word"
    t.bigint "destination_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["destination_id"], name: "index_buzzwords_on_destination_id"
  end

  create_table "destinations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "country"
    t.string "latitude"
    t.string "longitude"
    t.string "iso_country"
    t.integer "price_range"
    t.string "weather"
    t.string "trending"
  end

  create_table "dreamlists", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "destination_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["destination_id"], name: "index_dreamlists_on_destination_id"
    t.index ["user_id"], name: "index_dreamlists_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "home_base"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "vacations", force: :cascade do |t|
    t.date "start_date"
    t.date "end_date"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_vacations_on_user_id"
  end

  add_foreign_key "airport_locators", "airports"
  add_foreign_key "airport_locators", "destinations"
  add_foreign_key "buzzwords", "destinations"
  add_foreign_key "dreamlists", "destinations"
  add_foreign_key "dreamlists", "users"
  add_foreign_key "vacations", "users"
end
