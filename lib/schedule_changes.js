class ScheduleChanges {
    constructor(){
        //TODO parse https://www.wpi.edu/offices/registrar/calendar for info
        //Right now this is all hardcoded
        this.differentDays = [
            {date: new Date('September 5, 2019 00:00:00'), dayToUse: 1},
            {date: new Date('January 15, 2020 00:00:00'),  dayToUse: 1},
            {date: new Date('May 5, 2020 00:00:00'),       dayToUse: 5}
        ]
        this.daysOff = [
            new Date('September 2, 2019 00:00:00'),
            new Date('November 27, 2019 00:00:00'),
            new Date('November 28, 2019 00:00:00'),
            new Date('November 29, 2019 00:00:00'),
            new Date('December 10, 2019 00:00:00'),
            new Date('January 20, 2020 00:00:00'),
            new Date('February 27, 2020 00:00:00'),
            new Date('February 28, 2020 00:00:00'),
            new Date('April 20, 2020 00:00:00'),
            new Date('April 24, 2020 00:00:00')
        ]
    }
}
