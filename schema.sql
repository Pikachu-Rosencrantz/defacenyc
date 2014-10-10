CREATE DATABASE deface_nyc;

CREATE TABLE graffitis{
id serial primary key,
location_id integer,
artist_id integer,
address text,
status_id,
photo_url text,
latitude text,
longitude text
};

CREATE TABLE graffiti_artists{
id serial primary key,
name text
};

CREATE TABLE locations{
id serial primary key,
name_of_borough	text
};

CREATE TABLE statuses{
id serial primary key,
open boolean,
resolution text,
graffiti_id integer
};

