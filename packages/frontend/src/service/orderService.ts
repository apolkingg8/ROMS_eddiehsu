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

    get currentPage(): number {
        return Math.floor(this.totalCount - this.skip / this.take) + 1
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

    query = async ()=> {

    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new OrderService()
