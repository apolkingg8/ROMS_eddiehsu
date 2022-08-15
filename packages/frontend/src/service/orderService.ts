import EnumOrderSortBy from "common/Enum/EnumOrderSortBy";
import EnumSortDirection from "common/Enum/EnumSortDirection";
import {makeAutoObservable} from "mobx";
import Order from "common/Klass/Order";

export class OrderService {
    take: number = 20
    skip: number = 0
    searchKey: string = ''
    sortBy: EnumOrderSortBy = EnumOrderSortBy.createDate
    sortDirection: EnumSortDirection = EnumSortDirection.desc

    orders: Order[] = []
    totalCount: number = 0

    get totalPages(): number {
        return Math.floor(this.totalCount / this.take)
    }
    get currentPage(): number {
        return Math.floor(this.skip / this.take) + 1
    }

    setTake = (take: number)=> {
        this.take = take
    }

    setSkip = (skip: number)=> {
        this.skip = skip
    }

    setSearchKey = (searchKey: string)=> {
        this.searchKey = searchKey
    }

    setSortBy = (sortBy: EnumOrderSortBy)=> {
        this.sortBy = sortBy
    }

    setSortDirection = (sortDirection: EnumSortDirection)=> {
        this.sortDirection = sortDirection
    }

    queryOrders = async () => {
        const query = `
            query QueryOrders(
                $skip: Int
                $take: Int
                $searchKey: String
                $sortBy: EnumOrderSortBy
                $sortDirection: EnumSortDirection
            ) {
                ordersAndCount(
                    skip: $skip
                    take: $take
                    searchKey: $searchKey
                    sortBy: $sortBy
                    sortDirection: $sortDirection
                ) {
                    orders {
                        id
                        name
                        description
                        status
                        merchant {
                            id
                            name
                            description
                        }
                        products {
                            id
                            name
                            description
                        }
                        createDate
                        updateDate
                        completeDate
                        cancelDate
                    }
                    totalCount
                }
            }
        `
        const variables = {
            "skip": this.skip,
            "take": this.take,
            "searchKey": this.searchKey,
            "sortBy": this.sortBy,
            "sortDirection": this.sortDirection,
        }
        const fetched = await fetch(`http://localhost:3002/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables,
            })
        })
        const json = await fetched.json()
        const orders: Order[] = json['data']['ordersAndCount']['orders'].map((order)=> {
            return new Order(order)
        })
        const totalCount: number = json['data']['ordersAndCount']['totalCount']

        this.orders = orders
        this.totalCount = totalCount
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new OrderService()
