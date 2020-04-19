json.array! @users do |user|
  json.id user.id
  json.name user.name
end
# なぜ配列なのか
# [
# json{id: user.id, name: user.name}
# json{id: user.id, name: user.name}
# json{id: user.id, name: user.name}
# ]