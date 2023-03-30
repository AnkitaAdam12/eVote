const bodyParser = require('body-parser');
const express = require("express");
const Blockchain = require('./blockchain');

const app = express()
const blockchain = new Blockchain();

app.use(bodyParser.json());
app.get('/api/blocks', (req,res) => {
    res.json(blockchain.chain); //performing read operation
});

app.post("/api/mine",(req,res) => {
    const voterId = req.body.voterId;    //for writing data
    const pName = req.body.pName;

    blockchain.addBlock(voterId,pName);
    res.redirect('/api/blocks')
})

const DEFAULT_PORT = 3000;
let PEER_PORT;

if(process.env.GENERATE_PEER_PORT==='true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, ()=> {
    console.log(`listening to PORT:${PORT}`);
});