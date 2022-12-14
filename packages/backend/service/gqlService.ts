import {buildSchema, registerEnumType} from "type-graphql";
import EnumOrderStatus from "common/Enum/EnumOrderStatus";
import EnumOrderSortBy from "common/Enum/EnumOrderSortBy";
import OrderResolver from "../Resolver/OrderResolver";
import {createServer, YogaNodeServerInstance} from "@graphql-yoga/node";
import {GraphQLSchema} from "graphql";
import EnumSortDirection from "common/Enum/EnumSortDirection";

export class GqlService {
    schema: GraphQLSchema = null
    server: YogaNodeServerInstance<any, any, any> = null

    init = async ()=> {
        registerEnumType(EnumOrderSortBy, {
            name: 'EnumOrderSortBy',
        })
        registerEnumType(EnumOrderStatus, {
            name: 'EnumOrderStatus',
        })
        registerEnumType(EnumSortDirection, {
            name: 'EnumSortDirection',
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
