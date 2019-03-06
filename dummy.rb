user1 = User.create(name: "Song", home_base: "Xiamen")
user2 = User.create(name: "Minha", home_base: "Seoul")

vac1 = Vacation.create(start_date: "2019-04-10", end_date: "2019-05-10", user_id: 1)
vac2 = Vacation.create(start_date: "2019-06-04", end_date: "2019-07-23", user_id: 1)

list01 = Dreamlist.create(user_id: 1, destination_id: 2459)
list02 = Dreamlist.create(user_id: 1, destination_id: 2346)
list03 = Dreamlist.create(user_id: 1, destination_id: 302)
list04 = Dreamlist.create(user_id: 1, destination_id: 1623)
list05 = Dreamlist.create(user_id: 1, destination_id: 425)

list06 = Dreamlist.create(user_id: 2, destination_id: 2483)
list07 = Dreamlist.create(user_id: 2, destination_id: 411)
list08 = Dreamlist.create(user_id: 2, destination_id: 352)
list09 = Dreamlist.create(user_id: 2, destination_id: 2610)
list10 = Dreamlist.create(user_id: 2, destination_id: 722)