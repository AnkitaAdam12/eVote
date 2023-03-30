const MINE_RATE = 1000; //1s = 1000ms time rate for difficulty
const INITIAL_DIFFICULTY = '2';
const GENESIS_DATA={
    //preparing the genesis block for creating first block chain
    timestamp:'1',
    prevHash:'0x000',
    hash:'0x123',
    difficulty: INITIAL_DIFFICULTY,
    nonce: '0',
    voterId:"0",
    pName:"",
};

module.exports = {GENESIS_DATA, MINE_RATE};