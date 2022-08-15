import EnumOrderSortBy from "common/Enum/EnumOrderSortBy";
import dbService from "../service/dbService";
import OrderEntity from "../Entity/OrderEntity";
import EnumSortDirection from "common/Enum/EnumSortDirection";
import {QueryOrder} from "@mikro-orm/core";

export interface IOrderRepoQueryArgs {
    take: number
    skip: number
    sortBy: EnumOrderSortBy
    sortDirection: EnumSortDirection
    searchKey: string
}

export class OrderRepo {
    query = async (args: IOrderRepoQueryArgs): Promise<[OrderEntity[], number]> => {
        let orderType: QueryOrder = QueryOrder.DESC_NULLS_LAST

        switch (args.sortDirection) {
            case EnumSortDirection.asc:
                orderType = QueryOrder.ASC_NULLS_LAST
                break
            case EnumSortDirection.desc:
                orderType = QueryOrder.DESC_NULLS_LAST
                break
        }

        const [entities, totalCount]: [OrderEntity[], number] = await dbService.orderRepo.findAndCount({
            $or: [{
                id: {
                    $like: `%${args.searchKey}%`,
                },
            }, {
                name: {
                    $like: `%${args.searchKey}%`,
                },
            }, {
                description: {
                    $like: `%${args.searchKey}%`,
                },
            }, {
                status: {
                    $like: `%${args.searchKey}%`,
                },
            }]
        }, {
            limit: args.take,
            offset: args.skip,
            orderBy: {
                [args.sortBy]: orderType,
            },
        })

        return [entities, totalCount]
    }
}

export default new OrderRepo()
