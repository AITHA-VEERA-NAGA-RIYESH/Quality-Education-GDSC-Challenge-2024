chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.datarequest == "blockrequestdata") {
    getDatFromLocalStorage(request, sender, sendResponse);
    return true;
  } else if (request.datarequest == "blockrequest") {
    getUrlFromAction(request, sender, sendResponse);
    return true;
  }
});

function getDatFromLocalStorage(request, sender, sendResponse) {
  chrome.storage.local.get(["blockrequest"], function (data) {
    let datajsonin = data["blockrequest"];

    if (
      datajsonin == "" ||
      datajsonin == [] ||
      datajsonin == undefined ||
      datajsonin == null
    ) {
      datajsonin = { action: "unblock", url: "" };
    }
    datajson = datajsonin;
    console.log({ webListData: datajson });
    sendResponse({ webListData: datajson });
  });
}

function getUrlFromAction(request, sender, sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    console.log(new URL(tabs[0].url).hostname);
    let urlweb = new URL(tabs[0].url).hostname;
    chrome.storage.local.set({
      blockrequest: { action: request.content, url: urlweb },
    });
    console.log((" BAckground Update datajson ", datajson));

    sendResponse({ status: "success" });
  });
}
