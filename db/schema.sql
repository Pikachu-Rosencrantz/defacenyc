CREATE DATABASE deface_nyc;

CREATE TABLE graffitis(
id serial primary key,
location_id integer,
artist_id integer,
address text,
photo_url text,
<<<<<<< HEAD
latitude varchar(255),
longitude varchar(255)
=======
latitude text,
longitude text
>>>>>>> 4f45520d1d4454ec1f7191f30a0fc14adbd99f5e
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
