var moment=require('moment');
var now=moment();

var time=now.valueOf();

// console.log(now.utc(time).local().format('YYYY MMMM dd h:mm a'));

console.log(now.utc('07-18-2013', 'MM-DD-YYYY').local().toString());
