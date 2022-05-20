const hexToBinary = require('hex-to-binary');
const Block = require("./block");
const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");


describe('Block', () => {
    const data = 'a-data';
    const hash = 'a-hash';
    const lastHash = 'a-lastHash';
    const timeStamp = 2000;
    const nonce = 1;
    const difficulty = 1;

    const block = new Block({ data, hash, lastHash, timeStamp, difficulty, nonce });

    it("A block has data, hash, lastHash, and timeStamp property", () => {
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.timeStamp).toEqual(timeStamp);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();

        it('should returns a Block Instance', () => {
            expect(genesisBlock instanceof Block).toBe(true)
        });

        it('should returns genesis Data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA)
        });
    });

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({ lastBlock, data });

        it('should returns a Block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });

        it('sets the lastHash to be the hash of the lastBlock ', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the data ', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('sets a timestamp', () => {
            expect(minedBlock.timeStamp).not.toEqual(undefined);
        });

        it('should create a sha-256 hash based  on proper inputs', () => {
            expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timeStamp, lastBlock.hash, minedBlock.nonce, minedBlock.difficulty, data))
        });

        it('sets `hash` that matches the difficulty criteria ', () => {
            expect(hexToBinary(minedBlock.hash).substring(0, minedBlock.difficulty)).toEqual('0'.repeat(minedBlock.difficulty))
        });

        it('should adjust the difficulty', () => {
            const possibleResults = [lastBlock.difficulty + 1, lastBlock.difficulty - 1]
            expect(possibleResults.includes(minedBlock.difficulty)).toBe(true)

        });

    });

    describe('adjustDifficulty()', () => {
        it('should raise the difficulty for a quickly mined block', () => {
            expect(Block.adjustDifficulty({ originalBlock: block, timeStamp: block.timeStamp + MINE_RATE - 100 })).toEqual(block.difficulty + 1)
        });

        it('should lower the difficulty for a slowly mined block', () => {
            expect(Block.adjustDifficulty({ originalBlock: block, timeStamp: block.timeStamp + MINE_RATE + 100 })).toEqual(block.difficulty - 1)

            // expect(Block.adjustDifficulty({ originalBlock: block, timeStamp: block.timeStamp + MINE_RATE + 100 })).toEqual(block.difficulty - 1)
        });

        it('has a lower limit of 1', () => {
            block.difficulty = -1
            expect(Block.adjustDifficulty({ originalBlock: block })).toEqual(1)
        });
    });

});



