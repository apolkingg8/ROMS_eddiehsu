import {buildSchema, registerEnumType} from "type-graphql";
import EnumOrderStatus from "common/Enum/EnumOrderStatus";
import EnumOrderSort from "common/Enum/EnumOrderSort";
import OrderResolver from "../Resolver/OrderResolver";
import {createServer, YogaNodeServerInstance} from "@graphql-yoga/node";
import {GraphQLSchema} from "graphql";

export class GqlService {
    schema: GraphQLSchema = null
    server: YogaNodeServerInstance<any, any, any> = null

    init = async ()=> {
        registerEnumType(EnumOrderStatus, {
            name: 'EnumOrderStatus',
        })
        registerEnumType(EnumOrderSort, {
            name: 'EnumOrderSort',
        })
        this.schema = await buildSchema({
            resolvers: [OrderResolver],
        })
    }

    start = async ()=> {
        this.server = createServer({
            schema: this.schema,
            port: 3002,
        })

        await this.server.start()
    }
}

export default new GqlService()