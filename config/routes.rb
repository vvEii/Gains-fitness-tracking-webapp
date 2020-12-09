Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do # /api/data
    resources :homes, only: [:index]
    resources :todays, only: [:index]
    resources :calendars, only: [:index]
    resources :insights, only: [:index]
    resources :muscles, only: [:index]
    resources :exercises, only: [:index, :show]

    resources :users do
      member do
        get :display_workouts
      end
    end


    resources :workouts, except: [:new, :edit] do 
      member do
        post :add_exercise
        get :exercises
      end

      resources :remove_exercise, only: [:destroy], controller: "routines"
    end
    
    get '/setts/:workout_id/:exercise_id', to: 'setts#index'
    post '/setts/:workout_id/:exercise_id', to: 'setts#create'
    get '/setts/:workout_id/:exercise_id/:id', to: 'setts#show'
    put '/setts/:workout_id/:exercise_id/:id', to: 'setts#update'
    delete '/setts/:workout_id/:exercise_id/:id', to: 'setts#destroy'

  end


  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
