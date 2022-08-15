import React from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import themeStore from "../store/themeStore";
import SearchInput from "./SearchBar";

export interface HeaderProps {

}

const getStyles = computedFn(() => (stylesheet({
    wrap: {

    },
    titleRow: {
        display: "flex",
        alignItems: "flex-end",
        marginTop: 24,
        marginBottom: 24,
    },
    title: {
        margin: 0,
        fontSize: 64,
    },
    dumb: {
        flex: 1,
    },
    divider: {
        height: 4,
        background: themeStore.palette.divider,
    },
})))

const Header = (props: HeaderProps) => {
    const styles = getStyles()

    return (
        <div className={styles.wrap}>
            <div className={styles.titleRow}>
                <h1 className={styles.title}>
                    Orders
                </h1>
                <div className={styles.dumb}/>
                <SearchInput/>
            </div>
            <div className={styles.divider}/>
        </div>
    )
}

export default observer(Header)
