import { PrismaClient, Gender  } from "@prisma/client";
const prisma = new PrismaClient();
async function main(){
    const date = new Date()
    const trip = await prisma.trip.create({
        data:{
            start_date: date.toLocaleString(),
            end_date: date.setDate(date.getDate() + 5).toLocaleString(),
            location: "Wrocław",
        }
    })
    const participant = await prisma.participant.create({
        data:{
            imie: "Nikita",
            nazwisko: "Gwardiak",
            isVegan: false,
            gender: Gender.MALE,
            tripId: trip.id
        }
    })
    const expense = await prisma.expense.create({
        data:{
            participantId: participant.id,
            amount: 19.45,
            location: "Dino",
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