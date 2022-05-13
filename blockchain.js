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
            const block = chain[i];
            const actualLastHash = chain[i - 1].hash;

            const { timeStamp, data, lastHash, hash } = block;
            if (lastHash !== actualLastHash) return false;
            else if (cryptoHash(timeStamp, data, lastHash) !== hash) return false

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