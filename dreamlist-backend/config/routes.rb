Rails.application.routes.draw do
  resources :dreamlists
  resources :destinations
  resources :users
  resources :airports
  resources :vacations

  post '/searchresult', to: 'destinations#searchresult', as: 'searchresult'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
