require 'bundler/setup'
Bundler.require(:default)
require_relative './config/environments'
require_relative './lib/models'
require 'active_support'
require 'pry'

after do
	ActiveRecord::Base.connection.close
end


get("/") do
	File.open('./public/index.html')
end

get("/graffiti") do
	content_type :json

	if(params[:limit] != nil)
		Graffiti.all.order(id: :desc).limit(params[:limit].to_i).order(id: :desc).to_json
	else
		Graffiti.all.order(id: :desc).to_json
	end

end

# getting specific
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
		artist_id:param["artist_id"]
	}

	edit_graffiti = Graffiti.find_by({id: params[:id]}.to_i)
	edit_graffiti.update(graffiti_hash_edited)

	edit_graffiti_hash.to_json
end

post("/graffiti") do
	content_type :json

	graffiti_hash_new = {
		address:params["address"],
		photo_url:params["photo_url"],
		location_id:params["location_id"],
		artist_id: params["artist_id"]
	}

	new_graffiti = Graffiti.create(graffiti_hash_new)
	new_graffiti.to_json
end

post("/graffiti/:id") do
	graffiti_id = params[:id]
	graffiti_info = Graffiti.find(graffiti_id)
	graffiti_info.to_json
end


get("/images") do
	content_type :json

	Graffiti.where(id: params[:photo_url]).to_json
end

get("/:borough") do
	content_type :json

	Graffiti.where(location_id: params[:borough]).to_json
end
