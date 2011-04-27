Casamon::Application.routes.draw do
  root :to => 'pages#map'

  match '/admin' => redirect("/admin/articulos")

  scope "/admin" do
    resources :articles, :path => 'articulos'
    resources :datamaps, :path => 'mapas'
  end
end
