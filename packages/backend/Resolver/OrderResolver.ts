import {Arg, Query, Resolver} from "type-graphql";
import OrderEntity from "../Entity/OrderEntity";
import Order from "common/Klass/Order";
import dbService from "../service/dbService";

@Resolver()
class OrderResolver {
    @Query(()=> ([OrderEntity]))
    async orders(
        @Arg('take', {nullable: true}) take: number,
        @Arg('skip', {nullable: true}) skip: number,
    ): Promise<OrderEntity[]> {
        const res = await dbService.orderRepo.findAll()

        return res
    }
}

export default OrderResolver
