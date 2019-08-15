chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if (request.greeting == 'get_calendar_page'){
            var calendarDocument = document.implementation.createHTMLDocument('calendar_page')
            fetch('https://www.wpi.edu/offices/registrar/calendar')
                .then(response => response.text())
                .then(function(text){
                    calendarDocument.innerHTML = text
                    sendResponse({farewell: 'got_calendar_page', data: calendarDocument})
                })
            return true //allows listener to send response asynchronously without timing out
        }
    }
)
