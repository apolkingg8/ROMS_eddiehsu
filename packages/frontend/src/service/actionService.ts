import orderService from "./orderService";

export class ActionService {
    initApp = async ()=> {
        await orderService.getTotalCount()
        await orderService.queryOrders()
    }
}

export default new ActionService()
