const hexToBinary = require("hex-to-binary");
const { GENESIS_DATA, MINE_RATE} = require('./config');
const cryptoHash= require('./crypto-hash')
class Block{
    //Structure of blockchain
    constructor({timestamp, prevHash, hash, voterId, pName, nonce, difficulty}){
        this.timestamp= timestamp;  //current time of system
        this.prevHash= prevHash;    //hash of previous block
        this.hash= hash;            //hash of current block
        this.voterId= voterId; 
        this.pName = pName;           //data which are going to store in block
        this.nonce= nonce;          //with the help of nonce miners can change the hash of blockchain -for mining purpose  -for solving mathematical problem
        this.difficulty= difficulty;//difficulty is changes as more zero is there.
    }

    static genesis(){
        return new this(GENESIS_DATA);//to call genesis block only once 
        // importing the genesis data
    }

    static mineBlock({ prevBlock, voterId, pName }){ //to generate an individual block after minining 
        let hash, timestamp;
        const prevHash = prevBlock.hash;
        let { difficulty } = prevBlock;

        let nonce = 0;

        do{
            nonce++; //nonce increases untill hash reaches to its target
            timestamp=Date.now();
            difficulty=Block.adjustDifficulty({ //adjusting difficulty dynamically
                originalBlock:prevBlock,
                timestamp,
            });
            hash=cryptoHash(timestamp, prevHash, voterId, pName, nonce, difficulty)//calcultaing the hash using current timestamp, prevHash,data,nonce,and difficulty
            //timestamp and nonce is changing simulteneously
        }while(hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));     //abcdef 00  00cdef
            //at the time of minining the hash is in form of binary
            
        return new this({   //returning the value of block after mining 
           timestamp, 
           prevHash, 
           voterId,
           pName,
           difficulty,
           nonce,
           hash,
        });
    }

    static adjustDifficulty({originalBlock,timestamp}){ //Adjust the time
        const {difficulty} = originalBlock;             //
        if(difficulty<1) return 1;
        const difference = timestamp-originalBlock.timestamp; //difference between  the timestamp and originalblock's timestamp 
        if(difference>MINE_RATE)//if the difference is less than MINE_RATE then difficulty is increases and if the difference is more then MINE_RATE 
            return difficulty-1;        //then difficulty is decreases by 1

        return difficulty+1;
    }
}

const block1 = new Block({
    timestamp:'2/09/23',
    prevHash:'0xacb',
    hash:'0xc12',
    data:'hello'
});

// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// const result = Block.mineBlock({prevBlock: block1, data: "block2"});
// console.log(result);
// // console.log(block1)

module.exports=Block;