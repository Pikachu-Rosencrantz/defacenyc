require 'bundler/setup'
Bundler.require(:default)
require_relative './config/environments'
require_relative './lib/models'
require 'active_support'
require 'pry'
require 'httparty'

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
		artist_id:params["artist_id"]
	}

	edit_status = Status.find(params[:status][:id])
	edit_status.open = params[:status][:open]
	edit_status.save

	edit_graffiti = Graffiti.find_by({id: params[:id].to_i})


	edit_status = Status.find(params[:status][:id])
	edit_status.open = params[:status][:open]
	edit_status.save

	edit_graffiti.update(graffiti_hash_edited)

	edit_graffiti.to_json
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
	new_status = Status.create({open:true})
	new_graffiti.to_json
end

post("/graffiti/:id") do
	graffiti_id = params[:id]
	graffiti_info = Graffiti.find(graffiti_id)
	graffiti_info.to_json(:include => :status)
end

get("/images") do
	content_type :json

	Graffiti.where('photo_url is NOT NULL').to_json
end

get("/:borough") do
	content_type :json

	Graffiti.where(location_id: params[:borough]).to_json(:include => :status)
end

post("/subscribe") do

	name = params["name"]
	email = params["email"]
	graffiti_count = Graffiti.last.id
	Subscriber.create({name: name, email: email, graffiti_id: graffiti_count})

	params = {
		from: "defaceNYC <postmaster@sandbox8e6d73b42a1944319bf616f4f09f722d.mailgun.org>",
		to: email,
		subject: "Thanks for subscribing to defaceNYC!",
		text: "You will receive updates when our graffiti database has new images available!"
	}

	url = "https://api.mailgun.net/v2/sandbox8e6d73b42a1944319bf616f4f09f722d.mailgun.org/messages"
	auth = {:username=>"api", :password=>"key-7f1e23792ed85971de5368c4a92a0e42"}

	HTTParty.post(url, {body: params, basic_auth: auth})
end

get("/subscribe/email") do
	subscribers = Subscriber.all()
	subscribers.each do |subscriber|
		name = subscriber.name
		email = subscriber.email
		graffiti_count = subscriber.graffiti_id

		params = {
			from: "defaceNYC <postmaster@sandbox8e6d73b42a1944319bf616f4f09f722d.mailgun.org>",
			to: email,
			subject: "Fresh new graffiti images for you to consume!",
			text: "You have #{Graffiti.last.id - graffiti_count} new images to check out at http://defacenyc.herokuapp.com/ !"
		}

		url = "https://api.mailgun.net/v2/sandbox8e6d73b42a1944319bf616f4f09f722d.mailgun.org/messages"
		auth = {:username=>"api", :password=>"key-7f1e23792ed85971de5368c4a92a0e42"}

		HTTParty.post(url, {body: params, basic_auth: auth})
	end

end
