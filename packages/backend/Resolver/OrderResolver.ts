import {Arg, Query, Resolver} from "type-graphql";
import OrderEntity from "../Entity/OrderEntity";
import dbService from "../service/dbService";
import EnumOrderSort from "common/Enum/EnumOrderSort";

@Resolver()
class OrderResolver {
    @Query(()=> ([OrderEntity]))
    async orders(
        @Arg('take') take?: number,
        @Arg('skip') skip?: number,
        @Arg('sortBy', ()=> (EnumOrderSort)) sortBy?: EnumOrderSort,
    ): Promise<OrderEntity[]> {
        const res = await dbService.orderRepo.findAll()

        return res
    }
}

export default OrderResolver
