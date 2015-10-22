require 'sinatra'
require 'json'

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/posts' do
  content_type :json
  File.read('sample-10.json')
end

post '/posts' do
  content_type :json
  {"Message" => "Message from the back end: This is where you would post"}.to_json
end

put '/posts' do
  content_type :json
  {"Message" => "Message from the back end: This is where you would flag"}.to_json
end


delete '/posts' do
  content_type :json
  {"Message" => "Message from the back end: This is where you would delete"}.to_json
end
