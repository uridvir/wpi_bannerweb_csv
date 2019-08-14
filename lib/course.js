class Course {
    constructor(data){
        if (data.length == 0 || data[0].length != 12){
            console.log('data.length = ' + data.length)
            console.log('data[0].length = ' + data[0].length)
            throw 'Course constructed with invalid data!'
        }
        this.courseString = data[0][1]
        this.title = data[0][2]
        this.startDate = data[0][6]
        this.endDate = data[0][7]
        //Collects together the properties that change between lines
        this.collectedArray = []
        var daysReformat = function(days) {
            var result = []
            var i
            for (i = 0; i < days.length; i++){
                let day = days[i].toLowerCase()
                if (day == 'm'){
                    result.push(1)
                }
                if (day == 't'){
                    result.push(2)
                }
                if (day == 'w'){
                    result.push(3)
                }
                if (day == 'r'){
                    result.push(4)
                }
                if (day == 'f'){
                    result.push(5)
                }
            }
            return result
        }
        var i
        for (i = 0; i < data.length; i++){
            let times = data[i][9].split('-')
            let collected = {
                days: daysReformat(data[i][8]),
                startTime: times[0].trim(),
                endTime: times[1].trim(),
                location: data[i][10]
            }
            this.collectedArray.push(collected)
        }
    }

    /*
    The format is as follows
    "Subject", "Start Date", "Start Time", "End Date", "End Time", "Description", "Location"
    */
    formatAsEntries(){
        var entries = ''
        let dayInMillis = 24 * 60 * 60 * 1000;
        //One day past so that it can be at 12:00 am rather than 11:59:59 pm
        let endDate = new Date(new Date(this.endDate).getTime() + dayInMillis);
        var currentDate = new Date(this.startDate)
        while (currentDate < endDate){
            var i
            for (i = 0; i < this.collectedArray.length; i++){
                var j
                for (j = 0; j < this.collectedArray[i].days.length; j++){
                    if (this.collectedArray[i].days[j] == currentDate.getDay()){
                        let month = currentDate.getMonth() + 1
                        let date = currentDate.getDate()
                        let year = currentDate.getUTCFullYear()
                        entries += this.courseString + ','
                        entries += month + '/' + date + '/' + year + ','
                        entries += this.collectedArray[i].startTime + ','
                        //Assuming a class doesn't stretch between days
                        entries += month + '/' + date + '/' + year + ','
                        entries += this.collectedArray[i].endTime + ','
                        entries += this.title + ','
                        entries += this.collectedArray[i].location + '\n'
                    }
                }
            }
            let timestamp = currentDate.getTime() + dayInMillis
            currentDate = new Date(timestamp)
        }
        return entries
    }
}
