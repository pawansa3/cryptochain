const Block = require("./block");
const { GENESIS_DATA } = require("./config");

describe('Block', () => {
    const data = 'a-data';
    const hash = 'a-hash';
    const lastHash = 'a-lastHash';
    const timeStamp = 'a-date';

    const block = new Block({ data, hash, lastHash, timeStamp });

    it("A block has data, hash, lastHash, and timeStamp property", () => {
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.timeStamp).toEqual(timeStamp);
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

    describe('Mine Block', () => {
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

    });
});



