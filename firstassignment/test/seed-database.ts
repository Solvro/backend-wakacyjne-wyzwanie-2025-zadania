import { Gender, PrismaClient, Role } from "../generated/prisma/client";
const prisma = new PrismaClient();

export async function seedDatabase() {
    
    await prisma.user.createMany({
        data: [
            {username: "Bob", email: "bob@example.com",password: "string", role: Role.USER},
            {username: "Tomek (Kordynator)", email: "tomek@example.com",password: "string", role: Role.COORDINATOR},
            {username: "Józek (Admin)", email: "jozek@example.com",password: "root", role: Role.ADMIN},
        ],
    })

    await prisma.trip.createMany({
        data: [
            {
                location: "Wrocław",
                start_date:  new Date(Date.now() + 1000 * 60 * 60 * 24),
                end_date:  new Date(Date.now() + 1000 * 60 * 60 * 48),
            },
            {
                location: "Słupsk",
                start_date:  new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                end_date:  new Date(Date.now() + 1000 * 60 * 60 * 24 * 35),
            }
        ]
    })

    await prisma.participant.createMany({
        data: [
            {
                imie: "Nikita",
                nazwisko: "Gwardiak",
                isVegan: false,
                gender: Gender.MALE,
                tripId: 1,
            },
            {
                imie: "Józek",
                nazwisko: "Gruszeczka",
                isVegan: true,
                gender: Gender.MALE,
                tripId: 1,
            }
        ]
    })

    await prisma.expense.createMany({
        data:[
            {
                participantId: 1,
                amount: 19.45,
                location: "Dino",
            },
            {
                participantId: 1,
                amount: 7.44,
                location: "Żabka",
            }
        ]
    })
}