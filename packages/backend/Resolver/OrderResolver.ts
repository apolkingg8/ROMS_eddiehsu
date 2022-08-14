import {Args, ArgsType, Field, Int, Query, Resolver} from "type-graphql";
import OrderEntity from "../Entity/OrderEntity";
import EnumOrderSortBy from "common/Enum/EnumOrderSortBy";
import orderRepo from "../repostory/orderRepo";
import EnumSortDirection from "common/Enum/EnumSortDirection";

@ArgsType()
class OrdersArgs {
    @Field(type => Int, {
        nullable: true,
        defaultValue: 100,
    })
    take?: number

    @Field(type => Int, {
        nullable: true,
        defaultValue: 0,
    })
    skip?: number

    @Field(type => EnumOrderSortBy, {
        nullable: true,
        defaultValue: EnumOrderSortBy.createDate,
    })
    sortBy?: EnumOrderSortBy

    @Field(type => EnumSortDirection, {
        nullable: true,
        defaultValue: EnumSortDirection.desc,
    })
    sortDirection?: EnumSortDirection

    @Field({
        nullable: true,
        defaultValue: '',
    })
    searchKey?: string
}

@Resolver()
class OrderResolver {
    @Query(()=> ([OrderEntity]))
    async orders(@Args() args: OrdersArgs): Promise<OrderEntity[]> {
        const orderEntities = await orderRepo.query({
            take: args.take,
            skip: args.skip,
            sortBy: args.sortBy,
            sortDirection: args.sortDirection,
            searchKey: args.searchKey,
        })

        return orderEntities
    }
}

export default OrderResolver
