chrome.tabs.onUpdated.addListener((tabId, tab) => {
    // This if statement checks if the tab is a canvas.[university].edu tab
    const urlGeneralExpression = /canvas\..+\.edu/
    if (tab.url && urlGeneralExpression.test(tab.url)) {
        chrome.tabs.sendMessage(tabId, {
            isValidTab: true
        })
    }
})