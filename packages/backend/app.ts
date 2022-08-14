import "reflect-metadata";
import dbService from "./service/dbService";
import gqlService from "./service/gqlService";

const start = async ()=> {
    await dbService.init()
    await dbService.generateDumbData()
    await gqlService.init()
    await gqlService.start()
}

start().catch((err)=> {
    console.error(err)
})
