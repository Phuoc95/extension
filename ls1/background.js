// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({ color: '#3aa757' }, function() {
        console.log('The color is green.');
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'developer.chrome.com' },
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    chrome.contextMenus.create({
        id: "download_command",
        title: "Click here to download",
        contexts: ["all"]
    }, () => {
        const err = chrome.runtime.lastError;
        if (err) {
            console.warn('Context menu error ignored:', err);
        }
    });

    chrome.contextMenus.onClicked.addListener(function(info, tab) {
        if (info.menuItemId == "download_command") {
            downloadFunc();
        }
    });

});