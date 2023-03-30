const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];     //calling the genesis function of Block class to add data as a 1st block i.e. genesis  block in the chain
    }

    addBlock(voterId,pName){     //to add block to chain
        const newBlock = Block.mineBlock({      //before adding a block first require to mine a block    *block is added by miner and miner first mine the block if block is correct then they add it in chain*
            prevBlock: this.chain[this.chain.length-1], //for this we're passing the object to mineblock function which  contain the data of previous block
            voterId,
            pName
        })
        this.chain.push(newBlock); // added the block to the chain
        // return newBlock;
        return this.chain;
    }

    replaceChain(chain){        //blockchian have many more miners which mine the block, also they compite with each other and trying to give us longest chain
        if(chain.length <= this.chain.length){  //checking the length of chain sended by miner is greter than or not the existing chain
            console.error("The incoming chain is not longer")
            return;
        }
        if(!Blockchain.isValidChain(chain)){ //checking the given chain is validated not a malicious
            console.error("The incoming chain is not valid")
            return;
        }
        this.chain = chain; //adding the chain to the current chain
    }

    static isValidChain(chain){     //to chaeck the given block chain is valid or not
        //checking the genesis block valid or not
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){       //if first block is not equal or not a genesis block then it's malacious
            return false;
        }

        for(let i=1; i<chain.length; i++){      //checking the remaining block of chain
            const {timestamp, prevHash, hash, nonce, difficulty, data} = chain[i];
            const lastDifficulty = chain[i-1].difficulty;
            const realLastHash = chain[i-1].hash;   //Find the hash of immediate last block

            if(prevHash !== realLastHash){ //check the previous hash of current block and hash of last block is same or not
                return false;
            }

            if(Math.abs(lastDifficulty-difficulty) > 1) return false;
                

            const validatedHash = cryptoHash(   //calculate the hash of currnt block using given parameter
                timestamp,
                prevHash,
                nonce,
                difficulty,
                data);

            if(hash !== validatedHash){     //check whether the hash of current block is same or not after calculating the  hash using given parameter in validateHash
                return false;
            }
        }
        return true;
        
    }
}

const blockchain = new Blockchain();
blockchain.addBlock({ data: "Block1"});
blockchain.addBlock({ data: "Block2"});

const result = Blockchain.isValidChain(blockchain.chain);
// console.log(blockchain.chain);
// console.log(result);
module.exports = Blockchain;