// The following is a sample implementation of a backend service using Progress Kinvey (https://www.progress.com/kinvey).
// Feel free to swap in your own service / APIs / etc here for your own apps.

import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";

Kinvey.init({
    appKey: "kid_ByGMHgRJH",
    appSecret: "c7840336fa8f4b6886bf97045ae8c8d1"
});

export class BackendService {
    static isUserLoggedIn() {
        return !!Kinvey.User.getActiveUser();
    }
}