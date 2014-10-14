require 'active_record'

ActiveRecord::Base.establish_connection({
  :adapter => "postgresql",
  :host => "",
  :username => "root",
  :database => "deface_nyc"
})

ActiveRecord::Base.logger = Logger.new(STDOUT)
