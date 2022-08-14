import {v4} from "uuid";
import {makeAutoObservable} from "mobx";
import Merchant from "./Merchant";
import Product from "./Product";
import EnumOrderStatus from "../Enum/EnumOrderStatus";

class Order {
    id: string = v4()
    name: string = ''
    description: string = ''
    status: EnumOrderStatus = EnumOrderStatus.processing
    merchant: Merchant = null
    products: Product[] | any = []
    createDate: Date = null
    updateDate: Date = null
    completeDate: Date = null
    cancelDate: Date = null
    deleteDate: Date = null

    constructor(props: Partial<Order>) {
        Object.assign(this, props)
        makeAutoObservable(this)
    }
}

export default Order
