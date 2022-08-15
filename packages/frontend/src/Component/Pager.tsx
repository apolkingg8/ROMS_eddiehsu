import React from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import orderService from "../service/orderService";
import {Button} from "@mui/material";

export interface PagerProps {

}

const getStyles = computedFn(() => (stylesheet({
    wrap: {
        height: 64,
    },
    pageBtn: {
        margin: 8,
    },
})))

const Pager = (props: PagerProps) => {
    const pages: number[] = []
    const styles = getStyles()

    for(let i=1; i<=orderService.totalPages; i++) {
        pages.push(i)
    }

    return (
        <div className={styles.wrap}>
            {pages.map((page)=> {
                const isCurrent = page === orderService.currentPage

                return (
                    <Button
                        className={styles.pageBtn}
                        disabled={isCurrent}
                        onClick={()=> {
                            orderService.setSkip(orderService.take * (page - 1))
                            orderService.queryOrders()
                        }}
                    >
                        {page}
                    </Button>
                )
            })}
        </div>
    )
}

export default observer(Pager)
