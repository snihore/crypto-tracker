export default function totalDays(fromDate, toDate) {
    // var date1 = new Date("04/23/2021");
    // var date2 = new Date("05/07/2021");

    console.log("From Date: "+fromDate);
    console.log("To Date: "+toDate);

    var date1 = new Date(fromDate);
    var date2 = new Date(toDate);
    
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days;
}