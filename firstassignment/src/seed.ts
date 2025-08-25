import { PrismaClient, Gender } from "../generated/prisma/client";
const prisma = new PrismaClient();

async function main(){

    const date = new Date()
    const trip = await prisma.trip.create({
        data:{
            start_date: date,
            end_date: date,
            location: "Wrocław",
            created_at: date,
            updated_at: date,
        }
    })
    const participant = await prisma.participant.create({
        data:{
            imie: "Nikita",
            nazwisko: "Gwardiak",
            isVegan: false,
            gender: Gender.MALE,
            tripId: trip.id,
            created_at: date,
            updated_at: date,
        }
    })
    const expense = await prisma.expense.create({
        data:{
            participantId: participant.id,
            amount: 19.45,
            location: "Dino",
            created_at: date,
            updated_at: date,
        }
    })
    // eslint-disable-next-line no-console
    console.log(trip, participant, expense)
}

main().catch((error: unknown) =>{
    console.error(error);
    throw error
}).finally(async () =>{
    await prisma.$disconnect()
})