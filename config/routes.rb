Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
	post 'api/test', to: 'application#test'
	namespace :api, defaults: { format: :json } do
		get 'listings/search', to: "listings#search"
		resources :reviews, only: [:create, :destroy, :update]
		resources :users, only: [:create, :show, :destroy, :update] do 
			resources :reservations, only: [:index]
		end
		resources :listings do 
			resources :reviews, only: [:index, :show]
		end
		resources :reservations, only: [:create, :show, :destroy, :update ]
		resource :session, only: [:show, :create, :destroy]
	end

	get '*path', to: "static_pages#frontend_index"
end
