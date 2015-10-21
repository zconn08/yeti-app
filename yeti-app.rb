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
  {"This" => "is where you would post"}.to_json
end
