// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// "use strict";
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//   if(changeInfo && changeInfo.status == "complete"){
//       chrome.tabs.executeScript(tabId, {file: "jquery-3.5.1.js"}, function(){
//           chrome.tabs.executeScript(tabId, {file: "jquery-3.5.1.js"});
//       });
//   }
// });

let changeColor = document.getElementById("changeColor");
chrome.storage.sync.get("color", function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value", data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.body.style.backgroundColor = "' + color + '";'
    });
  });
};

var API_KEY = "AIzaSyBr49EVsHjskoFCOX6pTXwM2JdmhzS3gR4";

/**
 * Sample JavaScript code for photoslibrary.mediaItems.list
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */

function authenticate() {
  return gapi.auth2
    .getAuthInstance()
    .signIn({
      scope:
        "https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata"
    })
    .then(
      function() {
        console.log("Sign-in successful");
      },
      function(err) {
        console.error("Error signing in", err);
      }
    );
}
function loadClient() {
  gapi.client.setApiKey(API_KEY);
  return gapi.client
    .load(
      "https://content.googleapis.com/discovery/v1/apis/photoslibrary/v1/rest"
    )
    .then(
      function() {
        debugger;
        console.log("GAPI client loaded for API");
      },
      function(err) {
        debugger;
        console.error("Error loading GAPI client for API", err);
      }
    );
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.photoslibrary.mediaItems.list({}).then(
    function(response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },
    function(err) {
      console.error("Execute error", err);
    }
  );
}

gapi.load("client:auth2", function() {
    debugger;
    gapi.auth2.init({
      client_id:
        "473591084217-si0uclvrr4itcba48cnrt6kg4dl0ginq.apps.googleusercontent.com"
    });
});


$(document).on("click", "#download", function(e) {
  downloadFunc();
});

$(document).on("click", "#get_contact", function() {
  // $("#photosDiv").hide();
  // $("#contactList").empty();
  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    debugger;
    let init = {
      method: "GET",
      async: true,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      contentType: "json"
    };
    fetch(
      "https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=" +
        API_KEY,
      init
    )
      .then(response => response.json())
      .then(function(data) {
        let returnedContacts = data.memberResourceNames;
        // let photoDiv = document.querySelector('#contactDiv');

        let html = "";
        for (let i = 0; i < returnedContacts.length; i++) {
          console.log(
            `https://people.googleapis.com/v1/${returnedContacts[i]}?personFields=photos&key=API_KEY`
          );
          fetch(
            "https://people.googleapis.com/v1/" +
              returnedContacts[i] +
              "?personFields=photos,names,emailAddresses&key=" +
              API_KEY,
            init
          )
            .then(response => response.json())
            .then(function(data) {
              console.log(data, 88);
              let item_contact = `
                                    <li class="list-group-item">
                                      <img src="${data.photos && data.photos[0].url}" class="img_contact">
                                      <span> ${data.names && data.names[0].displayName}</span> - <span> ${data.emailAddresses && data.emailAddresses[0].value}</span>
                                    </li>`;

              $("#contactList").append(item_contact);

              // let profileImg = document.createElement('img');
              // profileImg.src = data.photos[0].url;
              // photoDiv.appendChild(profileImg);
            });
        }
      });
  });
});

$(document).on("click", "#get_photos", function() {
  $("#photosDiv").hide();
  $("#contactList").empty();
  authenticate().then(loadClient);
});

$(document).on("click", "#removeAuth", function() {
  var token =
    "ya29.a0Ae4lvC28lB6AkoMfEq3W_0RGoS5T3QU-cffFWaJPfD8-ErsEX2bgGefanEp_EnN9fBG6SaawVscTxm039P7eUZmqKceMX1kBs8BHPMs4BBGOGDjEjF787PJ4Lqd5pi-XdDNR8bFkARdJksy4Zm6zq0tU1UmEBwyCazo";
  var url = "https://accounts.google.com/o/oauth2/revoke?token=" + token;
  window.fetch(url);

  chrome.identity.removeCachedAuthToken({ token: token }, function() {
    alert("removed");
  });
});
