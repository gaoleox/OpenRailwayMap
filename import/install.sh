#!/bin/bash

# OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.


# do not run this script automatically! you have to change paths and modify it to your own environment!

PROJECTPATH=/home/www/sites/194.245.35.149/site/orm


# install necessary software
yum install gzip zlib zlib-devel postgresql-server postgresql-libs postgresql postgresql-common postgis geoip GeoIP geoip-devel GeoIP-devel php-pecl-geoip php-php-gettext php php-pgsql unzip postgresql-devel python-ply python-imaging pycairo python-cairosvg librsvg2 gnome-python2-rsvg pygobject2 pygobject2-devel librsvg2 librsvg2-devel pygtk2 pygtk2-devel

# GeoIP database
# add extension=geoip.so to php.ini
pecl install geoip
cd /usr/share/GeoIP
wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz
gunzip GeoIP.dat.gz
wget -N -q http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz
gunzip GeoLiteCity.dat.gz
mv GeoLiteCity.dat GeoIPCity.dat

cd $PROJECTPATH/import/bin

mkdir osmosis
cd osmosis
wget -O - http://bretth.dev.openstreetmap.org/osmosis-build/osmosis-latest.tgz | tar xz
cd ..

# set up the database
su postgres
createuser olm
createdb -E UTF8 -O olm railmap
createlang plpgsql railmap
psql -d railmap -f /usr/share/pgsql/contrib/postgis-64.sql
psql -d railmap -f /usr/share/pgsql/contrib/postgis-1.5/spatial_ref_sys.sql
psql -d railmap -f /usr/share/pgsql/contrib/hstore.sql
psql -d railmap -f osm2pgsql/900913.sql

# access
echo "ALTER ROLE w3_user1 LOGIN;" | psql -d railmap
echo "ALTER TABLE geometry_columns OWNER TO olm; ALTER TABLE spatial_ref_sys OWNER TO olm;"  | psql -d railmap
echo "GRANT SELECT ON geometry_columns TO apache; GRANT SELECT ON spatial_ref_sys TO apache;"  | psql -d railmap
echo "GRANT SELECT ON geography_columns TO apache;"  | psql -d railmap
echo "CREATE ROLE apache;" | psql -d railmap
echo "GRANT SELECT ON railmap_point TO apache;" | psql -d railmap
echo "GRANT SELECT ON railmap_line TO apache;" | psql -d railmap
echo "GRANT SELECT ON railmap_polygon TO apache;" | psql -d railmap
echo "GRANT SELECT ON railmap_rels TO apache;" | psql -d railmap
echo "GRANT SELECT ON railmap_nodes TO apache;" | psql -d railmap
echo "GRANT SELECT ON railmap_ways TO apache;" | psql -d railmap
echo "GRANT SELECT ON railmap_roads TO apache;" | psql -d railmap
echo "CREATE ROLE w3_user1;" | psql -d railmap
echo "GRANT SELECT ON railmap_point TO w3_user1;" | psql -d railmap
echo "GRANT SELECT ON railmap_line TO w3_user1;" | psql -d railmap
echo "GRANT SELECT ON railmap_polygon TO w3_user1;" | psql -d railmap
echo "GRANT SELECT ON railmap_rels TO w3_user1;" | psql -d railmap
echo "GRANT SELECT ON railmap_nodes TO w3_user1;" | psql -d railmap
echo "GRANT SELECT ON railmap_ways TO w3_user1;" | psql -d railmap
echo "GRANT SELECT ON railmap_roads TO w3_user1;" | psql -d railmap

# create hstore index
echo "CREATE INDEX railmap_point_tags ON railmap_point USING GIN (tags);" | psql -d railmap
echo "CREATE INDEX railmap_line_tags ON railmap_line USING GIN (tags);" | psql -d railmap
echo "CREATE INDEX railmap_polygon_tags ON railmap_polygon USING GIN (tags);" | psql -d railmap

# add hstore2json function for postgresql versions before 9.3
# from https://gist.github.com/kenaniah/1315484
echo "CREATE OR REPLACE FUNCTION public.hstore2json (
  hs public.hstore
)
RETURNS text AS
$body$
DECLARE
  rv text;
  r record;
BEGIN
  rv:='';
  for r in (select key, val from each(hs) as h(key, val)) loop
    if rv<>'' then
      rv:=rv||',';
    end if;
    rv:=rv || '"'  || r.key || '":';
    
    --Perform escaping
    r.val := REPLACE(r.val, E'\\', E'\\\\');
    r.val := REPLACE(r.val, '"', E'\\"');
    r.val := REPLACE(r.val, E'\n', E'\\n');
    r.val := REPLACE(r.val, E'\r', E'\\r');
    
    rv:=rv || CASE WHEN r.val IS NULL THEN 'null' ELSE '"'  || r.val || '"' END;
  end loop;
  return '{'||rv||'}';
END;
$body$
LANGUAGE 'plpgsql'
IMMUTABLE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;" | psql -d railmap
echo "ALTER FUNCTION hstore2json(hs public.hstore) OWNER TO apache;"  | psql -d railmap

# osmconvert, etc.
wget -O - http://m.m.i24.cc/osmupdate.c | cc -x c - -o osmupdate
wget -O - http://m.m.i24.cc/osmfilter.c | cc -x c - -o osmfilter
wget -O - http://m.m.i24.cc/osmconvert.c | cc -x c - -lz -o osmconvert

# osm2pgsql
svn co http://svn.openstreetmap.org/applications/utils/export/osm2pgsql/
patch -b osm2pgsql/expire-tiles.c expire-tiles.diff
cd osm2pgsql
./autogen.sh
./configure --enable-64bit-ids
sed -i 's/-g -O2/-O2 -march=native -fomit-frame-pointer/' Makefile
make
cd ..

# add this mod_rewrite rule to your apache configuration for having cache
# Options +Indexes +FollowSymLinks
# RewriteEngine on
# RewriteCond /home/www/sites/194.245.35.149/site/orm/%{REQUEST_URI} !-f
# RewriteRule /tiles/([0-9]+)/([0-9]+)/([0-9]+)\.js$ /renderer/vtiler.php?z=$1&x=$2&y=$3
# RewriteRule /tiles/([0-9]+)/([0-9]+)/([0-9]+)\.js/dirty$ /renderer/vtiler.php?z=$1&x=$2&y=$3

# if not existing, add a locales file for nqo_GN on your system by running these commands:
# cd /usr/share/i18n/locales
# cp en_GB nqo_GN
# vi nqo_GN and replace
##
## title      "English locale for Britain"
## source     "RAP"
## address    "Sankt J<U00F8>rgens Alle 8, DK-1615 K<U00F8>benhavn V, Danmark"
## contact    "Keld Simonsen"
## email      "bug-glibc-locales@gnu.org"
## tel        ""
## fax        ""
## language   "English"
## territory  "Great Britain"
## revision   "1.0"
## date       "2000-06-28"
## %
## category  "en_GB:2000";LC_IDENTIFICATION
## category  "en_GB:2000";LC_CTYPE
## category  "en_GB:2000";LC_COLLATE
## category  "en_GB:2000";LC_TIME
## category  "en_GB:2000";LC_NUMERIC
## category  "en_GB:2000";LC_MONETARY
## category  "en_GB:2000";LC_MESSAGES
## category  "en_GB:2000";LC_PAPER
## category  "en_GB:2000";LC_NAME
## category  "en_GB:2000";LC_ADDRESS
## category  "en_GB:2000";LC_TELEPHONE
##
# with
##
## title      "N'ko locale for Guinea - dirty workaround for LC_MESSAGES"
## source     "own"
## address    "Germany"
## contact    "Alexander Matheisen"
## email      "AlexanderMatheisen@ish.de"
## tel        ""
## fax        ""
## language   "N'ko"
## territory  "Guinea"
## revision   "0.1"
## date       "2013-09-07"
## %
## category  "nqo_GN:2000";LC_IDENTIFICATION
## category  "nqo_GN:2000";LC_CTYPE
## category  "nqo_GN:2000";LC_COLLATE
## category  "nqo_GN:2000";LC_TIME
## category  "nqo_GN:2000";LC_NUMERIC
## category  "nqo_GN:2000";LC_MONETARY
## category  "nqo_GN:2000";LC_MESSAGES
## category  "nqo_GN:2000";LC_PAPER
## category  "nqo_GN:2000";LC_NAME
## category  "nqo_GN:2000";LC_ADDRESS
## category  "nqo_GN:2000";LC_TELEPHONE
##
# localedef -f UTF-8 -i nqo_GN nqo_GN
