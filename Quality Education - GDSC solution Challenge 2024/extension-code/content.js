chrome.runtime.sendMessage(
  { datarequest: "blockrequestdata" },
  function (response) {
    console.log(response);
    datajson = response.webListData;
    console.log(datajson);
    let extensionurl = chrome.runtime.getURL("bg.PNG");
    console.log(extensionurl);
    if (datajson.action == "block") {
      if (
        location.hostname != datajson.url &&
        location.hostname != new URL(extensionurl).hostname
      ) {
        location.href = extensionurl;
      }
    } else {
      console.log("Not Blocked");
    }
  }
);
