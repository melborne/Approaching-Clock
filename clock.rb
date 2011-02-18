require 'sinatra'
require 'haml'
require 'sass'

configure do
  APP_TITLE = "Approaching Clock"
  CREDIT = ['hp12c', "http://d.hatena.ne.jp/keyesberry"]
end

get '/' do
  haml :index
end

get '/style.css' do
  scss :style
end
