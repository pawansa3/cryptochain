class Block {
    constructor({ data, hash, lastHash, timeStamp }) {
        this.data = data
        this.hash = hash
        this.lastHash = lastHash
        this.timeStamp = timeStamp
    }
}

// const block1 = new Block({ data: 'foo-data', hash: 'foo-hash', lastHash: 'foo-lastHash', timeStamp: '01/01/2022' })

// console.log(block1)


module.exports = Block