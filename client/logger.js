let url = "https://www.google.com";

function logMsg(msg) {
    // send an http request
    console.log(msg);
}


module.exports.logMsg = logMsg;
module.exports.endPoint = url