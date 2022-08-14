import React from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";


export interface AppProps {

}

const getStyles = computedFn(() => (stylesheet({
    wrap: {

    },
})))

const App = (props: AppProps) => {
    const styles = getStyles()

    return (
        <div className={styles.wrap}>
            Hello
        </div>
    )
}

export default observer(App)