const Block = require("./block");

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

    })
})



