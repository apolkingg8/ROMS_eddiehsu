import "reflect-metadata";
import {buildSchema, buildSchemaSync} from "type-graphql";
import OrderResolver from "./Resolver/OrderResolver";
import {createServer} from "@graphql-yoga/node";
import dbService from "./service/dbService";

const start = async ()=> {
    const graphQLSchema = await buildSchema({
        resolvers: [OrderResolver],
    })
    const server = createServer({
        schema: graphQLSchema,
        port: 3002,
    })

    await dbService.init()
    await dbService.generateDumbData()
    await server.start()
}

start().catch((err)=> {
    console.error(err)
})
