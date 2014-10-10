require 'bundler/setup'
Bundler.require(:default)

require 'sinatra'
require 'pry'
require_relative './config/environments'
require_relative './lib/models'
require 'active_support'

get("/")
	file.open
end

get("/:borough")
	graffiti.where(location_id: params[borough])
end

get("/grafffiti")
	grafffiti.all.order(id: description)
end

get("/graffiti/:id")
	graffiti.find(params[:id])
end

put("/graffiti/:id")

end

post("/graffiti")

end

get("/images")
	graffiti.where
end	