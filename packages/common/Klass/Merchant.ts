import {v4} from "uuid";
import {makeAutoObservable} from "mobx";
import Order from "./Order";

class Merchant {
    id: string = v4()
    name: string = ''
    description: string = ''
    orders: Order[] = []
    createDate: Date = null
    updateDate: Date = null
    deleteDate: Date = null

    constructor(props: Partial<Merchant>) {
        Object.assign(this, props)
        makeAutoObservable(this)
    }
}

export default Merchant
