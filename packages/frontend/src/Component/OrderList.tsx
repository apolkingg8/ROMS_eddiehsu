import React from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import orderService from "../service/orderService";
import OrderListRow from "./OrderListRow";
import {percent} from "csx";

export interface OrderListProps {

}

const getStyles = computedFn(() => (stylesheet({
    wrap: {
        width: percent(100),
        flex: 1,
        overflow: "auto",
    },
})))

const OrderList = (props: OrderListProps) => {
    const styles = getStyles()

    return (
        <div className={styles.wrap}>
            {orderService.orders.map((order)=> {
                return (
                    <OrderListRow order={order}/>
                )
            })}
        </div>
    )
}

export default observer(OrderList)
