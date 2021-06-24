function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function downloadFunc() {
    debugger
    chrome.tabs.query({ // Get active tab
        active: true,
        currentWindow: true
    }, function(tabs) {
        console.log(tabs, 'tabs');
        chrome.tabs.executeScript(tabs[0].id, {
            // code: " $('img'); if(imgs.length > 0){alert('abc');}",
            file: "script_down.js"
        });
    });

    chrome.runtime.onMessage.addListener(function(message) {
        //In case you want to do other things too this is a simple way to handle it
        let allImages = [];
        if (message.method == "downloadImages") {
            message.images.forEach(function(v) {
                allImages.push(v);
            });
            console.log(allImages[0], 'alldata');
        }
    });

    // console.log(uuidv4(), 'uuidv4');
    // let url = "https://i.imgur.com/RphICzc.jpg";
    // let filename = url.split('/').pop();
    // chrome.downloads.download({
    //     url,
    //     filename: 'images/' + filename, // Optional
    //     // saveAs: true
    // });

    // debugger
    // chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    //     debugger
    //     let url = tabs[0].url;

    //     var name = url.substr(url.lastIndexOf("/") + 1);
    //     chrome.downloads.download({ url: url, filename: 'download_folder/' + name, saveAs: false }, function(res_id) {
    //         if (typeof res_id === "undefined") // when failing to start the download
    //         {
    //             debugger
    //             /*err handling*/
    //         } else {
    //             debugger
    //             /*your further task*/
    //         }
    //     });
    // });

}