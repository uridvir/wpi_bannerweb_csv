chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if (request.greeting == 'imports'){
            //Add more imports here
            chrome.tabs.executeScript({file: 'lib/course.js'}, sendResponse({farewell: ''}))
        }
    }
)
