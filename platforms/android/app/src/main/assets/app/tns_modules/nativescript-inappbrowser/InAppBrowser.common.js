"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("tns-core-modules/application");
function getDefaultOptions(url, options) {
    return __assign({}, options, { url: url, dismissButtonStyle: options.dismissButtonStyle || 'close', readerMode: options.readerMode !== undefined ? options.readerMode : false });
}
exports.getDefaultOptions = getDefaultOptions;
var _redirectHandler;
function _waitForRedirectAsync(returnUrl) {
    return new Promise(function (resolve) {
        _redirectHandler = function (args) {
            var url = '';
            if (application_1.android) {
                var currentActivity = args.object.foregroundActivity || args.object.startActivity;
                url += currentActivity.getIntent().getData();
            }
            if (url.startsWith(returnUrl)) {
                resolve({ url: url, type: 'success' });
            }
        };
        application_1.on(application_1.resumeEvent, _redirectHandler);
    });
}
function openAuthSessionPolyfillAsync(startUrl, returnUrl, options, open) {
    return Promise.race([_waitForRedirectAsync(returnUrl), open(startUrl, options)]);
}
exports.openAuthSessionPolyfillAsync = openAuthSessionPolyfillAsync;
function closeAuthSessionPolyfillAsync() {
    if (_redirectHandler) {
        application_1.off(application_1.resumeEvent, _redirectHandler);
        _redirectHandler = null;
    }
}
exports.closeAuthSessionPolyfillAsync = closeAuthSessionPolyfillAsync;
//# sourceMappingURL=InAppBrowser.common.js.map