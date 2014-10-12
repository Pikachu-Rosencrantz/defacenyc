class GraffitiArtist < ActiveRecord::Base
  self.has_many(:graffitis)

end

class Graffiti < ActiveRecord::Base
  self.has_one(:graffitiartist)
  self.has_many(:locations)
  self.has_one(:status)
end

class Location < ActiveRecord::Base

end

class Status < ActiveRecord::Base
  self.has_one(:graffiti)
end
