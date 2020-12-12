"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Uri = android.net.Uri;
var Bundle = android.os.Bundle;
var Intent = android.content.Intent;
var Browser = android.provider.Browser;
var Pattern = java.util.regex.Pattern;
var AssertionError = java.lang.AssertionError;
var CustomTabsIntent = android.support.customtabs.CustomTabsIntent;
var color_1 = require("tns-core-modules/color");
var utils_1 = require("tns-core-modules/utils/utils");
var application_1 = require("tns-core-modules/application");
var ChromeTabsManagerActivity_1 = require("./ChromeTabsManagerActivity");
var InAppBrowser_common_1 = require("./InAppBrowser.common");
var InAppBrowserModule = (function (_super) {
    __extends(InAppBrowserModule, _super);
    function InAppBrowserModule() {
        var _this = _super.call(this) || this;
        _this.animationIdentifierPattern = Pattern.compile("^.+:.+/");
        return global.__native(_this);
    }
    InAppBrowserModule.prototype.isAvailable = function () {
        return Promise.resolve(true);
    };
    InAppBrowserModule.prototype.open = function (url, inAppBrowserOptions) {
        if (inAppBrowserOptions === void 0) { inAppBrowserOptions = {}; }
        var mOpenBrowserPromise = InAppBrowserModule.redirectResolve;
        if (mOpenBrowserPromise) {
            this.flowDidFinish();
            var response = { type: 'cancel' };
            return Promise.resolve(response);
        }
        this.currentActivity = application_1.android.foregroundActivity || application_1.android.startActivity;
        if (!this.currentActivity) {
            return Promise.reject(new Error(InAppBrowserModule.ERROR_CODE));
        }
        var options = InAppBrowser_common_1.getDefaultOptions(url, inAppBrowserOptions);
        var builder = new CustomTabsIntent.Builder();
        if (options[InAppBrowserModule.KEY_TOOLBAR_COLOR]) {
            var colorString = options[InAppBrowserModule.KEY_TOOLBAR_COLOR];
            try {
                builder.setToolbarColor(new color_1.Color(colorString).android);
            }
            catch (error) {
                throw new Error("Invalid toolbar color '" + colorString + "': " + error.message);
            }
        }
        if (options[InAppBrowserModule.KEY_SECONDARY_TOOLBAR_COLOR]) {
            var colorString = options[InAppBrowserModule.KEY_SECONDARY_TOOLBAR_COLOR];
            try {
                builder.setSecondaryToolbarColor(new color_1.Color(colorString).android);
            }
            catch (error) {
                throw new Error("Invalid secondary toolbar color '" + colorString + "': " + error.message);
            }
        }
        if (options[InAppBrowserModule.KEY_ENABLE_URL_BAR_HIDING]) {
            builder.enableUrlBarHiding();
        }
        if (options[InAppBrowserModule.KEY_DEFAULT_SHARE_MENU_ITEM]) {
            builder.addDefaultShareMenuItem();
        }
        var context = utils_1.ad.getApplicationContext();
        if (options[InAppBrowserModule.KEY_ANIMATIONS]) {
            var animations = options[InAppBrowserModule.KEY_ANIMATIONS];
            this.applyAnimation(context, builder, animations);
        }
        var customTabsIntent = builder.build();
        var keyHeaders = options[InAppBrowserModule.KEY_HEADERS];
        if (keyHeaders && keyHeaders.length) {
            var headers = new Bundle();
            for (var key in keyHeaders) {
                if (keyHeaders.hasOwnProperty(key)) {
                    headers.putString(key, keyHeaders[key]);
                }
            }
            customTabsIntent.intent.putExtra(Browser.EXTRA_HEADERS, headers);
        }
        if (options[InAppBrowserModule.KEY_FORCE_CLOSE_ON_REDIRECTION]) {
            customTabsIntent.intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
            customTabsIntent.intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        }
        var intent = customTabsIntent.intent;
        intent.setData(Uri.parse(url));
        if (options[InAppBrowserModule.KEY_SHOW_PAGE_TITLE]) {
            builder.setShowTitle(!!options[InAppBrowserModule.KEY_SHOW_PAGE_TITLE]);
        }
        else {
            intent.putExtra(CustomTabsIntent.EXTRA_TITLE_VISIBILITY_STATE, CustomTabsIntent.NO_TITLE);
        }
        this.registerEvent();
        this.currentActivity.startActivity(ChromeTabsManagerActivity_1.createStartIntent(this.currentActivity, intent), customTabsIntent.startAnimationBundle);
        return new Promise(function (resolve, reject) {
            InAppBrowserModule.redirectResolve = resolve;
            InAppBrowserModule.redirectReject = reject;
        });
    };
    InAppBrowserModule.prototype.close = function () {
        if (!InAppBrowserModule.redirectResolve) {
            return;
        }
        if (!this.currentActivity) {
            InAppBrowserModule.redirectReject(new Error(InAppBrowserModule.ERROR_CODE));
            this.flowDidFinish();
            return;
        }
        ChromeTabsManagerActivity_1.BROWSER_ACTIVITY_EVENTS.off('DismissedEvent');
        var response = { type: 'dismiss' };
        InAppBrowserModule.redirectResolve(response);
        this.flowDidFinish();
        this.currentActivity.startActivity(ChromeTabsManagerActivity_1.createDismissIntent(this.currentActivity));
    };
    InAppBrowserModule.prototype.openAuth = function (url, redirectUrl, inAppBrowserOptions) {
        if (inAppBrowserOptions === void 0) { inAppBrowserOptions = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var options;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = InAppBrowser_common_1.getDefaultOptions(url, inAppBrowserOptions);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4, InAppBrowser_common_1.openAuthSessionPolyfillAsync(url, redirectUrl, options, function (startUrl, opt) { return _this.open(startUrl, opt); })];
                    case 2: return [2, _a.sent()];
                    case 3:
                        this.close();
                        InAppBrowser_common_1.closeAuthSessionPolyfillAsync();
                        return [7];
                    case 4: return [2];
                }
            });
        });
    };
    InAppBrowserModule.prototype.closeAuth = function () {
        this.close();
        InAppBrowser_common_1.closeAuthSessionPolyfillAsync();
    };
    InAppBrowserModule.prototype.onEvent = function (event) {
        ChromeTabsManagerActivity_1.BROWSER_ACTIVITY_EVENTS.off('DismissedEvent');
        if (!InAppBrowserModule.redirectResolve) {
            throw new AssertionError();
        }
        var browserEvent = event.object;
        InAppBrowserModule.redirectResolve({
            type: browserEvent.resultType,
            message: browserEvent.message
        });
        this.flowDidFinish();
    };
    InAppBrowserModule.prototype.registerEvent = function () {
        var _this = this;
        ChromeTabsManagerActivity_1.BROWSER_ACTIVITY_EVENTS.once('DismissedEvent', function (e) { return _this.onEvent(e); });
    };
    InAppBrowserModule.prototype.resolveAnimationIdentifierIfNeeded = function (context, identifier) {
        if (this.animationIdentifierPattern.matcher(identifier).find()) {
            return context.getResources().getIdentifier(identifier, null, null);
        }
        else {
            return context.getResources().getIdentifier(identifier, "anim", context.getPackageName());
        }
    };
    InAppBrowserModule.prototype.applyAnimation = function (context, builder, animations) {
        var startEnterAnimationId = animations[InAppBrowserModule.KEY_ANIMATION_START_ENTER]
            ? this.resolveAnimationIdentifierIfNeeded(context, animations[InAppBrowserModule.KEY_ANIMATION_START_ENTER])
            : -1;
        var startExitAnimationId = animations[InAppBrowserModule.KEY_ANIMATION_START_EXIT]
            ? this.resolveAnimationIdentifierIfNeeded(context, animations[InAppBrowserModule.KEY_ANIMATION_START_EXIT])
            : -1;
        var endEnterAnimationId = animations[InAppBrowserModule.KEY_ANIMATION_END_ENTER]
            ? this.resolveAnimationIdentifierIfNeeded(context, animations[InAppBrowserModule.KEY_ANIMATION_END_ENTER])
            : -1;
        var endExitAnimationId = animations[InAppBrowserModule.KEY_ANIMATION_END_EXIT]
            ? this.resolveAnimationIdentifierIfNeeded(context, animations[InAppBrowserModule.KEY_ANIMATION_END_EXIT])
            : -1;
        if (startEnterAnimationId !== -1 && startExitAnimationId !== -1) {
            builder.setStartAnimations(context, startEnterAnimationId, startExitAnimationId);
        }
        if (endEnterAnimationId !== -1 && endExitAnimationId !== -1) {
            builder.setExitAnimations(context, endEnterAnimationId, endExitAnimationId);
        }
    };
    InAppBrowserModule.prototype.flowDidFinish = function () {
        InAppBrowserModule.redirectResolve = null;
        InAppBrowserModule.redirectReject = null;
    };
    InAppBrowserModule.ERROR_CODE = "InAppBrowser";
    InAppBrowserModule.KEY_TOOLBAR_COLOR = "toolbarColor";
    InAppBrowserModule.KEY_SECONDARY_TOOLBAR_COLOR = "secondaryToolbarColor";
    InAppBrowserModule.KEY_ENABLE_URL_BAR_HIDING = "enableUrlBarHiding";
    InAppBrowserModule.KEY_SHOW_PAGE_TITLE = "showTitle";
    InAppBrowserModule.KEY_DEFAULT_SHARE_MENU_ITEM = "enableDefaultShare";
    InAppBrowserModule.KEY_FORCE_CLOSE_ON_REDIRECTION = "forceCloseOnRedirection";
    InAppBrowserModule.KEY_ANIMATIONS = "animations";
    InAppBrowserModule.KEY_HEADERS = "headers";
    InAppBrowserModule.KEY_ANIMATION_START_ENTER = "startEnter";
    InAppBrowserModule.KEY_ANIMATION_START_EXIT = "startExit";
    InAppBrowserModule.KEY_ANIMATION_END_ENTER = "endEnter";
    InAppBrowserModule.KEY_ANIMATION_END_EXIT = "endExit";
    return InAppBrowserModule;
}(java.lang.Object));
exports.default = new InAppBrowserModule();
//# sourceMappingURL=InAppBrowser.js.map