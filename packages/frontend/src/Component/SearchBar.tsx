import React from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import {Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import styleStore from "../store/styleStore";
import orderService from "../service/orderService";
import EnumOrderSortBy from "common/Enum/EnumOrderSortBy";
import EnumSortDirection from "common/Enum/EnumSortDirection";

export interface SearchBarProps {

}

const getStyles = computedFn(() => (stylesheet({
    wrap: {
        ...styleStore.centerRow,
    },
    input: {
        width: 360,
    },
    searchBtn: {
        marginLeft: 16,
    },
    sortSelect: {
        minWidth: 96,
        marginLeft: 8,
    },
    sortDirectionMenuItem: {
        width: 240,
    }
})))

const SearchBar = (props: SearchBarProps) => {
    const styles = getStyles()

    return (
        <div className={styles.wrap}>
            <TextField
                className={styles.input}
                label={'Search'}
                placeholder={'Search order id, name, description or status'}
                value={orderService.searchKey}
                defaultValue={''}
                onChange={(event)=> {
                    orderService.setSkip(0)
                    orderService.setSearchKey(event.target.value)
                }}
            />
            <FormControl className={styles.sortSelect}>
                <InputLabel id={'sort-select'}>Sort by</InputLabel>
                <Select
                    labelId={'sort-select'}
                    label={'Sort by'}
                    value={orderService.sortBy}
                    defaultValue={EnumOrderSortBy.createDate}
                    onChange={(event)=> {
                        orderService.setSortBy(event.target.value as EnumOrderSortBy)
                    }}
                >
                    <MenuItem
                        className={styles.sortDirectionMenuItem}
                        onClick={()=> {
                            if(orderService.sortDirection === EnumSortDirection.asc) {
                                orderService.setSortDirection(EnumSortDirection.desc)
                            } else {
                                orderService.setSortDirection(EnumSortDirection.asc)
                            }
                        }}
                    >
                        {orderService.sortDirection === EnumSortDirection.desc && 'Descending sort'}
                        {orderService.sortDirection === EnumSortDirection.asc && 'Ascending sort'}
                    </MenuItem>
                    <Divider/>
                    <MenuItem value={EnumOrderSortBy.id}>ID</MenuItem>
                    <MenuItem value={EnumOrderSortBy.name}>Name</MenuItem>
                    <MenuItem value={EnumOrderSortBy.describe}>Describe</MenuItem>
                    <MenuItem value={EnumOrderSortBy.status}>Status</MenuItem>
                    <MenuItem value={EnumOrderSortBy.merchant}>Merchant</MenuItem>
                    <MenuItem value={EnumOrderSortBy.productsCount}>Products count</MenuItem>
                    <MenuItem value={EnumOrderSortBy.createDate}>Created date</MenuItem>
                    <MenuItem value={EnumOrderSortBy.updateDate}>Updated date</MenuItem>
                    <MenuItem value={EnumOrderSortBy.completeDate}>Completed date</MenuItem>
                    <MenuItem value={EnumOrderSortBy.cancelDate}>Canceled date</MenuItem>
                </Select>
            </FormControl>
            <Button
                className={styles.searchBtn}
                onClick={()=> {
                    orderService.queryOrders()
                }}
            >
                Search
            </Button>
        </div>
    )
}

export default observer(SearchBar)
