
require 'bundler/setup'
Bundler.require(:default)
require 'pry'
require_relative './config/environments'
require_relative './lib/models'
require 'active_support'

after do
	ActiveRecord::Base.connection.close
end



get("/:borough")
Graffiti.where(location_id: params[borough])
end

get("/grafffiti")
if(params[:limit] ! = "")
	Grafffiti.all.order(id: :desc).limit(params[:limit].to_i).order(id: :desc)
else
	Grafffiti.all.order(id: :desc)
end

end

get("/graffiti/:id")
Graffiti.find(params[:id])
end

put("/graffiti/:id")

end

post("/graffiti")

end

get("/images")
graffiti.where
end	

get '/' do
	
	File.open('./public/index.html')

end