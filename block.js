const { GENESIS_DATA } = require("./config")
const cryptoHash = require("./crypto-hash")

class Block {
    constructor({ data, hash, lastHash, timeStamp }) {
        this.data = data
        this.hash = hash
        this.lastHash = lastHash
        this.timeStamp = timeStamp
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ lastBlock, data }) {
        const timeStamp = Date.now();
        const lastHash = lastBlock.hash;
        return new this({ timeStamp, lastHash, data, hash: cryptoHash(timeStamp, lastHash, data) })
    }
}

// const block1 = new Block({ data: 'foo-data', hash: 'foo-hash', lastHash: 'foo-lastHash', timeStamp: '01/01/2022' })

// console.log(block1)


module.exports = Block