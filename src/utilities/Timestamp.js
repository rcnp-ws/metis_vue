import NF from '../utilities/NumberFormat';

function strFromSec(time=0) {
   let now = new Date()
   if (time != 0) {
      now = new Date(time*1000);
   }
   const year = now.getFullYear();
   const month = NF.zeroPadding(now.getMonth()+1,2)
   const day =  NF.zeroPadding(now.getDate(),2)
   const hh = NF.zeroPadding(now.getHours(),2)
   const mm = NF.zeroPadding(now.getMinutes(),2)
   const ss = NF.zeroPadding(now.getSeconds(),2)
   const tzhh = NF.zeroPadding(Math.abs(now.getTimezoneOffset()/60),2)
   const tzmm = NF.zeroPadding(Math.abs(now.getTimezoneOffset())%60,2)

   const tzstr =(now.getTimezoneOffset() < 0 ? "+" : "-") + tzhh + ":" + tzmm;            
   return year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss + " " + tzstr ;
}

export default {
   strFromSec,
}