"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Intent = android.content.Intent;
var observable_1 = require("tns-core-modules/data/observable");
var ChromeTabsEvent = (function (_super) {
    __extends(ChromeTabsEvent, _super);
    function ChromeTabsEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChromeTabsEvent;
}(observable_1.Observable));
exports.ChromeTabsEvent = ChromeTabsEvent;
exports.BROWSER_ACTIVITY_EVENTS = new ChromeTabsEvent();
var KEY_BROWSER_INTENT = 'browserIntent';
var ChromeTabsManagerActivity = (function (_super) {
    __extends(ChromeTabsManagerActivity, _super);
    function ChromeTabsManagerActivity() {
        var _this = _super.call(this) || this;
        _this.mOpened = false;
        return global.__native(_this);
    }
    ChromeTabsManagerActivity.prototype.onCreate = function (savedInstanceState) {
        _super.prototype.onCreate.call(this, savedInstanceState);
        if (this.getIntent().hasExtra(KEY_BROWSER_INTENT)) {
            var browserIntent = this.getIntent().getParcelableExtra(KEY_BROWSER_INTENT);
            browserIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            this.startActivity(browserIntent);
        }
        else {
            this.finish();
        }
    };
    ChromeTabsManagerActivity.prototype.onResume = function () {
        _super.prototype.onResume.call(this);
        if (!this.mOpened) {
            this.mOpened = true;
        }
        else {
            exports.BROWSER_ACTIVITY_EVENTS.set('message', 'chrome tabs activity closed');
            exports.BROWSER_ACTIVITY_EVENTS.set('resultType', 'cancel');
            exports.BROWSER_ACTIVITY_EVENTS.notify({
                eventName: 'DismissedEvent',
                object: exports.BROWSER_ACTIVITY_EVENTS
            });
            this.finish();
        }
    };
    ChromeTabsManagerActivity.prototype.onDestroy = function () {
        exports.BROWSER_ACTIVITY_EVENTS.set('message', 'chrome tabs activity destroyed');
        exports.BROWSER_ACTIVITY_EVENTS.set('resultType', 'dismiss');
        exports.BROWSER_ACTIVITY_EVENTS.notify({
            eventName: 'DismissedEvent',
            object: exports.BROWSER_ACTIVITY_EVENTS
        });
        _super.prototype.onDestroy.call(this);
    };
    ChromeTabsManagerActivity.prototype.onNewIntent = function (intent) {
        _super.prototype.onNewIntent.call(this, intent);
        this.setIntent(intent);
    };
    ChromeTabsManagerActivity = __decorate([
        JavaProxy('com.proyecto26.inappbrowser.ChromeTabsManagerActivity'),
        __metadata("design:paramtypes", [])
    ], ChromeTabsManagerActivity);
    return ChromeTabsManagerActivity;
}(android.app.Activity));
exports.ChromeTabsManagerActivity = ChromeTabsManagerActivity;
exports.createStartIntent = function (context, authIntent) {
    var intent = exports.createBaseIntent(context);
    intent.putExtra(KEY_BROWSER_INTENT, authIntent);
    return intent;
};
exports.createDismissIntent = function (context) {
    var intent = exports.createBaseIntent(context);
    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
    return intent;
};
exports.createBaseIntent = function (context) {
    return new Intent(context, ChromeTabsManagerActivity.class);
};
//# sourceMappingURL=ChromeTabsManagerActivity.js.map