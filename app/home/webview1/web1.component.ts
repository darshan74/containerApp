import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "app-webview1",
    templateUrl: "./home/webview1/web1.component.html"
})

export class Web1Component {

    constructor( private routerExtensions: RouterExtensions) {
    }

    goBack(){

        this.routerExtensions.navigate(["/home"], { clearHistory: true });
    }

}