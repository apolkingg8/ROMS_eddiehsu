import React from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import Order from "common/Klass/Order";
import styleStore from "../store/styleStore";

export interface OrderListRowProps {
    order: Order
}

const getStyles = computedFn(() => (stylesheet({
    wrap: {
        ...styleStore.centerRow,
        justifyContent: "flex-start",
        height: 64,
    },
    box: {
        paddingLeft: 16,
        paddingRight: 16
    },
})))

const OrderListRow = (props: OrderListRowProps) => {
    const styles = getStyles()

    return (
        <div className={styles.wrap}>
            <div className={styles.box}>
                {props.order.id}
            </div>
            <div className={styles.box}>
                {props.order.name}
            </div>
            <div className={styles.box}>
                {props.order.description}
            </div>
            <div className={styles.box}>
                {props.order.status}
            </div>
            <div className={styles.box}>
                {props.order.merchant.name}
            </div>
            <div className={styles.box}>
                {props.order.products.length}
            </div>
        </div>
    )
}

export default observer(OrderListRow)
