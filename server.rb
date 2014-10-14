require 'bundler/setup'
Bundler.require(:default)
require_relative './config/environments'
require_relative './lib/models'
require 'active_support'
# require 'pry'
require 'uri'

after do
	ActiveRecord::Base.connection.close
end

get("/") do
	File.open('./public/index.html')
end

get("/graffiti") do
	content_type :json

	if(params[:page] == nil)
		page=1
		offset= (page-1)*(params[:limit].to_i)
	else
		page=params[:page].to_i
		offset= (page-1)*(params[:limit].to_i)
	end
	if(params[:limit] != nil)
		Graffiti.all.order(id: :desc).limit(params[:limit].to_i).offset(offset).order(id: :desc).to_json(:include => :status)

	else
		Graffiti.all.order(id: :desc).to_json(:include => :status)
	end

end

get("/graffiti/:id") do
	content_type :json

	Graffiti.find(params[:id])
end

put("/graffiti/:id") do
	content_type :json



	graffiti_hash_edited = {
		address:params["address"],
		photo_url:params["photo_url"],
		location_id:params["location_id"],
		artist_id:params["artist_id"]
	}

	edit_graffiti = Graffiti.find_by({id: params[:id].to_i})

	edit_status = Status.find(params[:status][:id])
	edit_status.open = params[:status][:open]
	edit_status.save

	edit_graffiti.update(graffiti_hash_edited)

	edit_graffiti.to_json
end

post("/graffiti") do
	api = HTTParty.get(URI.encode("https://maps.googleapis.com/maps/api/geocode/json?address=#{params[:address]}&key=AIzaSyBH66qMfXgrihEfE9HIDagtjdxIBn8N_Fc"))
	latitude = api["results"][0]["geometry"]["location"]["lat"]
	longitude = api["results"][0]["geometry"]["location"]["lng"]
	content_type :json

	graffiti_hash_new = {
		address:params["address"],
		photo_url:params["photo_url"],
		location_id:params["location_id"],
		latitude: latitude,
		longitude: longitude
	}

	new_graffiti = Graffiti.create(graffiti_hash_new)
	new_status = Status.create({open:true, graffiti_id: new_graffiti.id})
	new_graffiti.to_json(:include => :status)
end


get("/images") do
	content_type :json

	Graffiti.where('photo_url is NOT NULL').to_json
end

get("/:borough") do
	content_type :json

	Graffiti.where(location_id: params[:borough]).to_json(:include => :status)
end
