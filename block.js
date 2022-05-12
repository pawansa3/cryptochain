const { GENESIS_DATA } = require("./config")

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
        return new this({ timeStamp: Date.now(), lastHash: lastBlock.hash, data })
    }
}

// const block1 = new Block({ data: 'foo-data', hash: 'foo-hash', lastHash: 'foo-lastHash', timeStamp: '01/01/2022' })

// console.log(block1)


module.exports = Block