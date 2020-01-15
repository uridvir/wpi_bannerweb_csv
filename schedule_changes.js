var changes
//Tells calendar_page.js to use its background script powers to fetch the calendar page from wpi.edu
chrome.runtime.sendMessage({greeting: 'get_calendar_page'}, function(response){
    var differentDays = []
    var daysOff = []
    var parser = new DOMParser()
    var calendarDocument = parser.parseFromString(response.text, 'text/html')
    let list = calendarDocument.getElementsByClassName('field-item even')[0]
    var state = 'fall_year_header'
    var date
    var i = 0
    while (i < list.children.length){
        switch (state){
            case 'fall_year_header':
                //Text says "Fall <current year>"
                let year = list.children[i].innerText.split(' ')[1]
                date = new Date('August 1, ' + year)
                i += 2
                state = 'other'
                break
            case 'month_text':
                date.setMonth(date.getMonth() + 1)
                i++
                state = 'table'
                break
            case 'table':
                let table = list.children[i].children[0]
                for (var row = 0; row < table.children.length; row++){
                    //Regex will match "27-29" in "Nov 27-29", also matches dates not in ranges
                    let regex = /[1-3]?[0-9](\-[1-3]?[0-9])?/g
                    var dateString = table.children[row].children[0].innerText
                    var dateRangeArray = dateString.match(regex)[0].split('-')
                    var dates = []
                    if (dateRangeArray.length == 1){
                        dates = [parseInt(dateRangeArray[0])]
                    }
                    else if (dateRangeArray.length == 2){
                        for (var j = parseInt(dateRangeArray[0]); j <= parseInt(dateRangeArray[1]); j++){
                            dates.push(j)
                        }
                    }
                    else {
                        throw 'Date string ' + '\"' + dateString + '\" is invalid!'
                    }
                    let info = table.children[row].children[1].innerText
                    if (info.includes('No classes') || info.includes('no classes')){
                        for (var j = 0; j < dates.length; j++){
                            date.setDate(dates[j])
                            //Create new Date() object in push because otherwise all entries would have
                            //the same date (passing by reference vs. by copy)
                            daysOff.push(new Date(date.getTime()))
                        }
                    }
                    var addDifferentDay = function(dayToUse){
                        for (var j = 0; j < dates.length; j++){
                            date.setDate(dates[j])
                            //Passing by copy also happens here
                            differentDays.push({date: new Date(date.getTime()), dayToUse: dayToUse})
                        }
                    }
                    var followSchedule = function(dayStr){
                        return info.includes('follow ' + dayStr + ' schedule')
                            || info.includes('Follow ' + dayStr + ' schedule')
                    }
                    if (followSchedule('Monday')){
                        addDifferentDay(1)
                    }
                    if (followSchedule('Tuesday')){
                        addDifferentDay(2)
                    }
                    if (followSchedule('Wednesday')){
                        addDifferentDay(3)
                    }
                    if (followSchedule('Thursday')){
                        addDifferentDay(4)
                    }
                    if (followSchedule('Friday')){
                        addDifferentDay(5)
                    }
                }
                date.setDate(1)
                i++
                state = 'other'
                break
            case 'other':
                //Only month names are bold and underlined in the part of the doc we care about
                if (list.children[i].innerHTML.startsWith('<strong><span class="underline">')){
                    state = 'month_text'
                }
                else {
                    i++
                }
                break
        }
    }
    changes = {differentDays: differentDays, daysOff: daysOff}
})
