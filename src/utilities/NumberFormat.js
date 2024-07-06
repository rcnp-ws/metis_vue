// NUM=値 LEN=桁数
function zeroPadding(NUM, LEN) {
   return ( Array(LEN).join('0') + NUM ).slice( -LEN );
}
export default {
   zeroPadding,
}
