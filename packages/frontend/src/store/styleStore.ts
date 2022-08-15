import {makeAutoObservable} from "mobx";
import {cssRule} from "typestyle";
import {percent, rgba} from "csx";
import {NestedCSSProperties} from "typestyle/lib/types";
import {lightGreen, pink} from "@mui/material/colors";

export class StyleStore {
    palette = {
        transparent: rgba(0, 0, 0, 0).toString(),
        product: pink[500],
        robot: lightGreen[500],
    }

    centerRow: NestedCSSProperties = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    }

    centerCol: NestedCSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }

    constructor() {
        cssRule(`html, body, #root`, {
            width: percent(100),
            height: percent(100),
        })
        cssRule(`*`, {
            userSelect: "none",
            outline: "none",
        })
        makeAutoObservable(this)
    }
}

export default new StyleStore()
