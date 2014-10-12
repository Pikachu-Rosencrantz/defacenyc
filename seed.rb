
require 'json'
require 'pry'
require_relative './db/connection'

class GraffitiArtist < ActiveRecord::Base
  self.has_many(:graffitis)
end

class Graffiti < ActiveRecord::Base
 self.has_one(:graffitiartists)
 self.has_many(:locations)
 self.has_one(:status)
end

class Location < ActiveRecord::Base

end

class Status < ActiveRecord::Base
  self.has_one(:graffitis)
end


brooklyn = Location.create(name: "Brooklyn")
bronx = Location.create(name: "Bronx")
manhattan = Location.create(name: "Manhattan")
queens = Location.create(name: "Queens")
staten_island = Location.create(name: "Staten Island")


brooklyn_data = []
bronx_data = []
manhattan_data = []
queens_data = []
staten_island_data = []

data = JSON.parse(File.read('./graffiti.json'))

data["data"].each do |d|
  if d[9].slice(0,4) == "2014"
    if d[9].slice(5,2).include?("07" || "08" || "09" || "10") == true
      if d[24] == "BROOKLYN"
        brooklyn_data.push(d)
      elsif d[24] == "BRONX"
        bronx_data.push(d)
      elsif d[24] == "NEW YORK"
        manhattan_data.push(d)
      elsif d[24] == "STATEN ISLAND"
        staten_island_data.push(d)
      else
        queens_data.push(d)
      end
    end
  end
end

brooklyn_data.each do |bk|
  if bk[27] == "Open"
    graffiti = Graffiti.create({location_id: brooklyn.id, address: bk[17], latitude:bk[57], longitude:bk[58]})
    Status.create({open:true, graffiti_id: graffiti.id})
  else
    graffiti = Graffiti.create({location_id: brooklyn.id, address: bk[17], latitude:bk[57], longitude:bk[58]})
    Status.create({open:false, graffiti_id: graffiti.id})
  end
end

bronx_data.each do |bx|
  if bx[27] == "Open"
    graffiti = Graffiti.create({location_id: bronx.id, address: bx[17], latitude:bx[57], longitude:bx[58]})
    Status.create({open:true, graffiti_id: graffiti.id})
  else
    graffiti = Graffiti.create({location_id: bronx.id, address: bx[17], latitude:bx[57], longitude:bx[58]})
    Status.create({open:false, graffiti_id: graffiti.id})
  end
end

manhattan_data.each do |mh|
  if mh[27] == "Open"
    graffiti = Graffiti.create({location_id: manhattan.id, address: mh[17], latitude:mh[57], longitude:mh[58]})
    Status.create({open:true, graffiti_id: graffiti.id})
  else
    graffiti = Graffiti.create({location_id: manhattan.id, address: mh[17], latitude:mh[57], longitude:mh[58]})
    Status.create({open:false, graffiti_id: graffiti.id})
  end
end

queens_data.each do |q|
  if q[27] == "Open"
    graffiti = Graffiti.create({location_id: queens.id, address: q[17], latitude:q[57], longitude:q[58]})
    Status.create({open:true, graffiti_id: graffiti.id})
  else
    graffiti = Graffiti.create({location_id: queens.id, address: q[17], latitude:q[57], longitude:q[58]})
    Status.create({open:false, graffiti_id: graffiti.id})
  end
end

staten_island_data.each do |si|
  if si[27] == "Open"
    graffiti = Graffiti.create({location_id: staten_island.id, address: si[17], latitude:si[57], longitude:si[58]})
    Status.create({open:true, graffiti_id: graffiti.id})
  else
    graffiti = Graffiti.create({location_id: staten_island.id, address: si[17], latitude:si[57], longitude:si[58]})
    Status.create({open:false, graffiti_id: graffiti.id})
  end
end

binding.pry
