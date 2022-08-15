import React from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import Order from "common/Klass/Order";
import styleStore from "../store/styleStore";
import dayjs from "dayjs";
import {grey, lightGreen} from "@mui/material/colors";
import EnumOrderStatus from "common/Enum/EnumOrderStatus";
import {Tooltip} from "@mui/material";

export interface OrderListRowProps {
    order: Order
}

const getStyles = computedFn((color: string) => (stylesheet({
    wrap: {
        ...styleStore.centerRow,
        justifyContent: "flex-start",
        height: 64,
    },
    idCol: {
        ...styleStore.basicCol,
        width: 256,
        color: color,
    },
    nameCol: {
        ...styleStore.basicCol,
        width: 128,
        color: color,
    },
    descCol: {
        ...styleStore.basicCol,
        flex: 1,
        color: color,
    },
    statusCol: {
        ...styleStore.basicCol,
        width: 128,
        color: color,
    },
    merchantCol: {
        ...styleStore.basicCol,
        width: 128,
        color: color,
    },
    productCol: {
        ...styleStore.basicCol,
        width: 64,
        color: color,
    },
    dateCol: {
        ...styleStore.basicCol,
        width: 128,
        color: color,
    },
})))

const OrderListRow = (props: OrderListRowProps) => {
    let color: string = grey[100]

    switch (props.order.status) {
        case EnumOrderStatus.processing:
            color = grey[100]
            break
        case EnumOrderStatus.completed:
            color = lightGreen[500]
            break
        case EnumOrderStatus.canceled:
            color = grey[700]
            break
    }

    const styles = getStyles(color)

    return (
        <div className={styles.wrap}>
            <Tooltip title={'ID'}>
                <div className={styles.idCol}>
                    {props.order.id}
                </div>
            </Tooltip>
            <Tooltip title={'Name'}>
                <div className={styles.nameCol}>
                    {props.order.name}
                </div>
            </Tooltip>
            <Tooltip title={'Description'}>
                <div className={styles.descCol}>
                    {props.order.description}
                </div>
            </Tooltip>
            <Tooltip title={'Status'}>
                <div className={styles.statusCol}>
                    {props.order.status}
                </div>
            </Tooltip>
            <Tooltip title={'Merchant name'}>
                <div className={styles.merchantCol}>
                    {props.order.merchant.name}
                </div>
            </Tooltip>
            <Tooltip title={'Products count'}>
                <div className={styles.productCol}>
                    {props.order.products.length}
                </div>
            </Tooltip>
            <Tooltip title={'Created date'}>
                <div className={styles.dateCol}>
                    {dayjs(props.order.createDate).format('YYYY-MM-DD')}
                </div>
            </Tooltip>
            <Tooltip title={'Updated date'}>
                <div className={styles.dateCol}>
                    {dayjs(props.order.updateDate).format('YYYY-MM-DD')}
                </div>
            </Tooltip>
            <Tooltip title={'Completed date'}>
                <div className={styles.dateCol}>
                    {props.order.isCompleted && dayjs(props.order.completeDate).format('YYYY-MM-DD')}
                </div>
            </Tooltip>
            <Tooltip title={'Canceled date'}>
                <div className={styles.dateCol}>
                    {props.order.isCanceled && dayjs(props.order.cancelDate).format('YYYY-MM-DD')}
                </div>
            </Tooltip>

        </div>
    )
}

export default observer(OrderListRow)
