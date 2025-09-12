import { Gender, Role } from "../generated/prisma";

export const USER = 0;
export const COORDINATOR = 1;
export const ADMIN = 2;

export const users = [
    {id: 1, username: "Bob", email: "bob@example.com",password: "string", role: Role.USER},
    {id: 2, username: "Tomek (Kordynator)", email: "tomek@example.com",password: "string", role: Role.COORDINATOR},
    {id: 3, username: "Józek (Admin)", email: "jozek@example.com",password: "root", role: Role.ADMIN},
]

export const trips = [
    {
        id: 1,
        location: "Wrocław",
        start_date:  new Date(Date.now() + 1000 * 60 * 60 * 24),
        end_date:  new Date(Date.now() + 1000 * 60 * 60 * 48),
    },
    {
        id: 2,
        location: "Słupsk",
        start_date:  new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        end_date:  new Date(Date.now() + 1000 * 60 * 60 * 24 * 35),
    }
]

export const participants = [
    {
        id: 1,
        imie: "Nikita",
        nazwisko: "Gwardiak",
        isVegan: false,
        gender: Gender.MALE,
        tripId: trips[0].id,
    },
    {
        id: 2,
        imie: "Józek",
        nazwisko: "Gruszeczka",
        isVegan: true,
        gender: Gender.MALE,
        tripId: trips[0].id,
    },
]

export const expenses = [
    {
        id: 1,
        amount: 19.45,
        location: "Dino",
        participantId: 1,
    },
    {
        id: 2,
        amount: 7.44,
        location: "Żabka",
        participantId: 1,
    }
]