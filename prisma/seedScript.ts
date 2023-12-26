import { PrismaClient } from '@prisma/client';
import { fetchChampionData } from '../src/server/services/championService'
const prisma = new PrismaClient(); //this prisma client will be garbage collected in then catch blocks


//Grabs the champion data
const championSeedData = await fetchChampionData()
    .then(()=>{
        //need to write a way to format the factions and tags into true false values for all
    })
    let seedStartTime:number;
    let seedEndTime:number;
async function main() {
    //to keep track how long the seeding process takes
    seedStartTime = Date.now();

    const champions = await prisma.champion.createMany({
        data:championSeedData //can ignore this error, should go away after writing championSeedData
    })
    console.dir(champions,{depth: null}); //Will show full depth of objects
    //to keep track how long the seeding process takes
    seedEndTime = Date.now()
}

main()
    .then(async () => {
        console.log('<---Seeding completed in ' + (seedEndTime - seedStartTime) + 'Seconds.--->')
        //disconnects from the prismaclient instance
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.log("Error in seed file:")
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })