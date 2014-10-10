
require 'bundler/setup'
Bundler.require(:default)
require_relative './config/environments'
require_relative './lib/models'
require 'active_support'
require 'pry'

after do
	ActiveRecord::Base.connection.close
end

get("/:borough") do
Graffiti.where(location_id: params[borough])
end

get("/grafffiti") do
	if(params[:limit] ! = "")
		Grafffiti.all.order(id: :desc).limit(params[:limit].to_i).order(id: :desc)
	else
		Grafffiti.all.order(id: :desc)
	end
end

get("/graffiti/:id") do
Graffiti.find(params[:id])
end

put("/graffiti/:id") do

end

post("/graffiti")

end

get("/images") do
graffiti.where
end	

get '/' do
	
	File.open('./public/index.html')

end