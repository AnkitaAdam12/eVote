const crypto = require('crypto');//provided by javascript

const cryptoHash =(...inputs)=> {           //(...inputs) - spread oprator - to accept multiple inputs 
    const hash = crypto.createHash("sha256"); //sha256 is algorithm
    hash.update(inputs.sort().join(""));    //helloworld  - concatnating the input
    return hash.digest('hex');              //return output in hex format
}

// result = cryptoHash("hello","world");

module.exports=cryptoHash;
// console.log(result);