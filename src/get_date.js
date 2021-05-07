export default function getDate(){
    var dateObj = new Date();

    var month = dateObj.getMonth();
    var date = dateObj.getDate();
    var year = dateObj.getFullYear();

    return (month+1)+"/"+date+"/"+year;
}