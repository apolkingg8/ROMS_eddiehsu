import {v4} from "uuid";
import {makeAutoObservable} from "mobx";
import Order from "./Order";

class Product {
    id: string = v4()
    name: string = ''
    description: string = ''
    orders: Order[] = []
    createDate: Date = null
    updateDate: Date = null
    deleteDate: Date = null

    constructor(props: Partial<Product>) {
        Object.assign(this, props)

        props.orders && (this.orders = props.orders.map((o)=> (new Order(o))))
        props.createDate && (this.createDate = new Date(props.createDate))
        props.updateDate && (this.createDate = new Date(props.createDate))
        props.deleteDate && (this.createDate = new Date(props.createDate))

        makeAutoObservable(this)
    }
}

export default Product
