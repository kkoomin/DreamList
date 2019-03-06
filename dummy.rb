user1 = User.create(name: "Song", home_base: "Xiamen")
user2 = User.create(name: "Minha", home_base: "Seoul")

vac1 = Vacation.create(start_date: "2019-04-10", end_date: "2019-05-10", user_id: 1)
vac2 = Vacation.create(start_date: "2019-06-04", end_date: "2019-07-23", user_id: 1)

vac3 = Vacation.create(start_date: "2019-04-04", end_date: "2019-05-23", user_id: 2)
vac4 = Vacation.create(start_date: "2019-05-04", end_date: "2019-05-23", user_id: 2)

list01 = Dreamlist.create(user_id: 1, destination_id: 2483)


list06 = Dreamlist.create(user_id: 2, destination_id: 2483)
