#!/usr/bin/env ruby

require 'bundler/setup'
Bundler.require(:default)
require_relative '../config/environments'
require_relative '../lib/models'
require 'active_support'
require 'pry'
require 'httparty'



subscribers = Subscriber.all()

subscriber_hash = {}
subscribers.each do |subscriber|
 # if subscriber[:graffiti_id] < Graffiti.last.id
   subscriber_hash[subscriber[:id]] = subscriber[:graffiti_id]

 end

 # subscriber_hash.each do |x|
 #   if

puts subscriber_hash

binding.pry
