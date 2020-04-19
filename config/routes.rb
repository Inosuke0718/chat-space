Rails.application.routes.draw do

  devise_for :users
  # この記述の意味ってなんだっけ？

  root 'groups#index'

  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:index, :new, :create, :edit, :update]

  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end

end