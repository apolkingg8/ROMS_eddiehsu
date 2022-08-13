import {v4} from "uuid";
import {makeAutoObservable} from "mobx";
import Merchant from "./Merchant";
import Product from "./Product";

class Order {
    id: string = v4()
    name: string = ''
    description: string = ''
    merchant: Merchant = null
    products: Product[] | any = []
    createDate: Date = null
    updateDate: Date = null
    deleteDate: Date = null

    constructor(props: Partial<Order>) {
        Object.assign(this, props)
        makeAutoObservable(this)
    }
}

export default Order
