const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class BlockChain {
    constructor() {
        this.chain = [Block.genesis()]
    }


    addBlock({ data }) {
        const newBlock = Block.mineBlock({ lastBlock: this.chain[this.chain.length - 1], data })
        this.chain.push(newBlock)
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for (let i = 1; i < chain.length; i++) {
            const { timeStamp, data, lastHash, hash, difficulty, nonce } = chain[i];
            const actualLastHash = chain[i - 1].hash;
            const lastDifficulty = chain[i - 1].difficulty;

            if (lastHash !== actualLastHash) return false;

            const validatedHash = cryptoHash(timeStamp, data, lastHash, difficulty, nonce);
            if (validatedHash !== hash) return false;

            if (Math.abs(lastDifficulty - difficulty) > 1) return false;

        }

        return true;
    }

    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            return console.error('the incoming chain must be longer');
        }

        if (!BlockChain.isValidChain(chain)) {
            return console.error('the incoming chain must be valid');
        }
        console.log('replacing chain with', chain);
        return this.chain = chain;
    }

}

module.exports = BlockChain