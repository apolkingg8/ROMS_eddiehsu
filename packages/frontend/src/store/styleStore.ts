import {makeAutoObservable} from "mobx";
import {cssRule} from "typestyle";
import {color, percent, rgba} from "csx";
import {NestedCSSProperties} from "typestyle/lib/types";
import {lightGreen, pink} from "@mui/material/colors";
import {computedFn} from "mobx-utils";
import themeStore from "./themeStore";

export class StyleStore {
    palette = {
        transparent: rgba(0, 0, 0, 0).toString(),
        product: pink[500],
        robot: lightGreen[500],
    }

    multiLineEllipsis = computedFn((lines: number): NestedCSSProperties => {
        return {
            display: "-webkit-box",
            "-webkit-line-clamp": lines,
            // @ts-ignore
            "-webkit-box-orient": "vertical",
            wordBreak: "break-all",
            overflow: "hidden",
        }
    })

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

    basicCol: NestedCSSProperties = {
        ...this.multiLineEllipsis(2),
        paddingLeft: 16,
        paddingRight: 16,
    }

    scrollBar = (size?: number, thumbColor?: string)=> {
        let _size = typeof size === "undefined" ? 6 : size
        let _thumbColor = thumbColor || color(themeStore.palette.primary.dark)
            .toString()

        return {
            '&::-webkit-scrollbar': {
                width: _size,
            },
            '&::-webkit-scrollbar:vertical': {
                width: _size,
            },
            '&::-webkit-scrollbar:horizontal': {
                height: _size,
            },
            '&::-webkit-scrollbar-track': {
                background: "transparent",
            },
            '&::-webkit-scrollbar-thumb': {
                background: _thumbColor,
                borderRadius: Math.floor(_size / 2),
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: _thumbColor,
            },
        }
    }

    constructor() {
        cssRule(`html, body, #root`, {
            width: percent(100),
            height: percent(100),
        })
        cssRule(`*`, {
            outline: "none",
        })
        makeAutoObservable(this)
    }
}

export default new StyleStore()
