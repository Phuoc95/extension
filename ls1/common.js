function downloadFunc() {
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

}