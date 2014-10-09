
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


brooklyn_data.each do |bk|
  if bk[27] == "Open"
    Graffiti.create({location_id: brooklyn.id, address: bk[17], open: true })
  else
    Graffiti.create({location_id: brooklyn.id, address: bk[17], open: false })
  end
end
