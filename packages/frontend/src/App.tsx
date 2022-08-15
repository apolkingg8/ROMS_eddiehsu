import React from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import {viewHeight, viewWidth} from "csx";
import themeStore from "./store/themeStore";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./Component/Header";


export interface AppProps {

}

const getStyles = computedFn(() => (stylesheet({
    wrap: {
        width: viewWidth(100),
        height: viewHeight(100),
        padding: 24,
        background: themeStore.palette.background.default,
    },
})))

const App = (props: AppProps) => {
    const styles = getStyles()

    return (
        <ThemeProvider theme={themeStore.muiTheme}>
            <CssBaseline/>
            <div className={styles.wrap}>
                <Header/>
            </div>
        </ThemeProvider>
    )
}

export default observer(App)
