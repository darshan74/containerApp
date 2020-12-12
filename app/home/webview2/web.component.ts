import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "app-webview",
    templateUrl: "./home/webview2/web.component.html"
})

export class Web2Component {

    
    constructor( private routerExtensions: RouterExtensions) {
    }
    
    goBack(){

        this.routerExtensions.navigate(["/home"], { clearHistory: true });
    }
}