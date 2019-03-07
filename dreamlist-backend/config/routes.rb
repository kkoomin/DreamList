Rails.application.routes.draw do
  resources :dreamlists
  resources :users
  resources :airports
  resources :vacations

  get 'users/:id/homeAirportCodes', to: 'users#homeAirportCodes', as: 'homeAirportCodes'
  get 'users/:id/listDestinations', to: 'users#listDestinations', as: 'listDestinations'
  get 'destinations/:id/destinationAirports', to: 'destinations#getAirports', as: 'destinationAirports'

  post '/searchresult', to: 'destinations#searchresult', as: 'searchresult'
  get '/searchresult/:id', to: 'destinations#searchresult_one', as: 'searchresult_one'
  post '/add-destination', to: 'users#add_destination', as: 'add_destination'
  get '/destinations/worldcities', to: 'destinations#worldcities', as:'worldcities'
  resources :destinations

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
