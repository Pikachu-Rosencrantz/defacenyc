require 'bundler/setup'
Bundler.require(:default)
require_relative './config/environments'
require_relative './lib/models'
require 'active_support'

get '/' do
	
	File.open('./public/index.html')

end
