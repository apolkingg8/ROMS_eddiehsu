import {makeAutoObservable} from "mobx";
import {createTheme, Theme} from "@mui/material";
import {ThemeOptions} from "@mui/material/styles/createTheme";
import {lightGreen} from "@mui/material/colors";

export class ThemeStore {
    themeOptions: ThemeOptions = {
        palette: {
            mode: "dark",
            primary: lightGreen,
        },
        shape: {
            borderRadius: 8,
        },
    }

    get muiTheme(): Theme {
        return createTheme(this.themeOptions)
    }
    get palette() {
        return this.muiTheme.palette
    }
    get shadow() {
        return this.muiTheme.shadows
    }

    constructor() {

        makeAutoObservable(this)
    }
}

export default new ThemeStore()
