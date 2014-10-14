CREATE DATABASE deface_nyc;

CREATE TABLE graffitis(
id serial primary key,
location_id integer,
artist_id integer,
address text,
photo_url text,
latitude integer,
longitude integer
);

CREATE TABLE graffiti_artists(
id serial primary key,
name text
);

CREATE TABLE locations(
id serial primary key,
name text
);

CREATE TABLE statuses(
id serial primary key,
open boolean,
resolution text,
graffiti_id integer
);
CREATE TABLE subscribers(
id serial primary key,
name text,
email text,
graffiti_id integer
);
