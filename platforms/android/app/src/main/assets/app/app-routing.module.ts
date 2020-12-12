import { Web1Component } from './home/webview1/web1.component';

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from './login/login.component';

import { BackendService } from "./shared/backend.service";
import { Web2Component } from './home/webview2/web.component';

const routes: Routes = [
    { path: "", redirectTo: BackendService.isUserLoggedIn() ? "/home" : "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path:"webview1", component: Web1Component},
    { path:"webview2", component: Web2Component },
    { path: "home", loadChildren: "./home/home.module#HomeModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
