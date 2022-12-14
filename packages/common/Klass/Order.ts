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
    products: Product[] = []
    createDate: Date = null
    updateDate: Date = null
    completeDate: Date = null
    cancelDate: Date = null
    deleteDate: Date = null

    get isCompleted(): boolean {
        return this.status === EnumOrderStatus.completed
    }
    get isCanceled(): boolean {
        return this.status === EnumOrderStatus.canceled
    }

    constructor(props: Partial<Order>) {
        Object.assign(this, props)

        props.merchant && (this.merchant = new Merchant(props.merchant))
        props.products && (this.products = props.products.map((p)=> (new Product(p))))
        props.createDate && (this.createDate = new Date(props.createDate))
        props.updateDate && (this.createDate = new Date(props.createDate))
        props.completeDate && (this.createDate = new Date(props.createDate))
        props.cancelDate && (this.createDate = new Date(props.createDate))
        props.deleteDate && (this.createDate = new Date(props.createDate))

        makeAutoObservable(this)
    }
}

export default Order
