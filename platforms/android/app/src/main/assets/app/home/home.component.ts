import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Router } from '@angular/router';
import { UserService } from "../shared/user.service";
import { openApp } from "nativescript-open-app";

@Component({
    selector: "app-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    message = "You have successfully authenticated. This is where you build your core application functionality.";

    constructor(private userService: UserService, private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
    }

    logout() {
        this.userService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    }


    btnclick() {
       
            this.routerExtensions.navigate(["/webview1"], { clearHistory: true });
    }
    
    btnclick1() {
        this.routerExtensions.navigate(["/webview2"], { clearHistory: true });
    }

    btnclick2() {
        openApp("com.eclerx_services.android.fs");
    }
}





