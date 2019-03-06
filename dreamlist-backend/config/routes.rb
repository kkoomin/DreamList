Rails.application.routes.draw do
  resources :dreamlists
  resources :destinations
  resources :users
  resources :airports
  resources :vacations

  get 'users/:id/homeAirportCodes', to: 'users#homeAirportCodes', as: 'homeAirportCodes'
  get 'users/:id/listDestinations', to: 'users#listDestinations', as: 'listDestinations'
  get 'destinations/:id/destinationAirports', to: 'destinations#getAirports', as: 'destinationAirports'

  post '/searchresult', to: 'destinations#searchresult', as: 'searchresult'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
