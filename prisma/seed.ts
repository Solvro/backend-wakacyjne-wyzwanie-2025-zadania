import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const trip = await prisma.trip.create({
        data: {
            name: "Weekend w górach",
            status: "PLANNED",
        },
    })

    const participant = await prisma.participant.create({
        data: {
            name: "Jan Kowalski",
            email: "jan@example.com",
            role: "ORGANIZER",
            tripId: trip.id,
        },
    })

    await prisma.expense.create({
        data: {
            description: "Paliwo",
            amount: 250.0,
            tripId: trip.id,
            participantId: participant.id,
        },
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })