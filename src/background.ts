chrome.runtime.onInstalled.addListener(() => {
  console.log('AnyColor installed.');
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.captureVisibleTab(null, (data) => {
    console.log('captured data:', data);
  });
});
