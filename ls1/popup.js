// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//   if(changeInfo && changeInfo.status == "complete"){
//       chrome.tabs.executeScript(tabId, {file: "jquery-3.5.1.js"}, function(){
//           chrome.tabs.executeScript(tabId, {file: "jquery-3.5.1.js"});
//       });
//   }
// });

let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  console.log(element, 200);
  debugger
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

let download = document.getElementById('download');
download.onclick = function(element) {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;

    var name = url.substr(url.lastIndexOf("/")+1);
    chrome.downloads.download({url:url,filename:'download_folder/'+name,saveAs:false},function(res_id){
        if(typeof res_id === "undefined") // when failing to start the download
        {
          debugger
            /*err handling*/
        }
        else
        {
          debugger
            /*your further task*/
        }
    });
  });

};

// chrome.downloads.download({
//   url: url,
//   filename: "suggested/filename/with/relative.path" // Optional
// });
