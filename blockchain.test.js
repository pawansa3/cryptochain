const Block = require("./block");
const BlockChain = require("./blockchain");
const cryptoHash = require("./crypto-hash");


describe('BlockChain', () => {
    let blockChain, newChain, originalChain;

    beforeEach(() => {
        blockChain = new BlockChain();
        newChain = new BlockChain();

        originalChain = blockChain.chain;
    })

    it('should contain a chain of Array instance', () => {
        expect(blockChain.chain instanceof Array).toBe(true);
    });

    it('should starts with the genesis block', () => {
        expect(blockChain.chain[0]).toEqual(Block.genesis())
    });

    it('should add new block to the block chain', () => {
        const newData = 'foo bar';
        blockChain.addBlock({ data: newData });
        expect(blockChain.chain[blockChain.chain.length - 1].data).toEqual(newData);
    });


    describe('isValidChain()', () => {
        describe('when chain does not start with the genesis block', () => {
            it('should return false', () => {
                blockChain.chain[0] = { data: 'fake-genesis' }
                expect(BlockChain.isValidChain(blockChain.chain)).toBe(false)
            });
        });

        describe('when the chain starts with genesis block and has multiple blocks', () => {

            beforeEach(() => {
                blockChain.addBlock({ data: 'Bears' })
                blockChain.addBlock({ data: 'Beers' })
                blockChain.addBlock({ data: 'Beets' })
            })

            describe('and a lastHash reference has changed', () => {
                it('should return false', () => {

                    blockChain.chain[2].lastHash = 'broken-lastHash'

                    expect(BlockChain.isValidChain(blockChain.chain)).toBe(false)
                });
            });


            describe('and when chain contains a block with invalid field', () => {
                it('should return false', () => {


                    blockChain.chain[2].data = 'some bad evil data'

                    expect(BlockChain.isValidChain(blockChain.chain)).toBe(false)
                });
            });

            describe('and the chain contains a block with a jumped difficulty', () => {
                it('should return false', () => {
                    const lastBlock = blockChain.chain[blockChain.chain.length - 1];
                    const lastHash = lastBlock.hash;
                    const timeStamp = Date.now();
                    const nonce = 0;
                    const data = [];
                    const difficulty = lastBlock.difficulty - 3;

                    const hash = cryptoHash(timeStamp, lastHash, difficulty, nonce, data);
                    const badBlock = new Block({ timeStamp, lastHash, hash, nonce, data, difficulty });

                    blockChain.chain.push(badBlock);

                    expect(BlockChain.isValidChain(blockChain.chain)).toBe(false)
                });
            });

            describe('and the chain does not contain any invalid blocks', () => {
                it('should return true', () => {

                    expect(BlockChain.isValidChain(blockChain.chain)).toBe(true)
                });
            });
        });
    });

    describe('replaceChain()', () => {

        let errorMock, logMock;

        beforeEach(() => {
            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = logMock;
        })

        describe('when the new chain is not longer', () => {

            beforeEach(() => {

                newChain.chain[0] = { new: 'chain' };
                blockChain.replaceChain(newChain.chain);
            })

            it('does not replace the chain', () => {

                expect(blockChain.chain).toEqual(originalChain);
            });

            it('logs an error', () => {
                expect(errorMock).toHaveBeenCalled();
            });
        });



        describe('when the chain is longer', () => {
            beforeEach(() => {

                newChain.addBlock({ data: 'Bears' })
                newChain.addBlock({ data: 'Beers' })
                newChain.addBlock({ data: 'Beets' })
            })
            describe('and the chain is invalid', () => {

                beforeEach(() => {

                    newChain.chain[2].hash = 'some-fake-hash';

                    blockChain.replaceChain(newChain.chain)
                })


                it('does not replace the chain', () => {

                    expect(blockChain.chain).toEqual(originalChain);
                });

                it('logs an error', () => {
                    expect(errorMock).toHaveBeenCalled()
                });
            });

            describe('and the chain is valid', () => {

                beforeEach(() => {
                    blockChain.replaceChain(newChain.chain)
                });

                it('replaces the chain', () => {
                    expect(blockChain.chain).toEqual(newChain.chain);
                });

                it('logs about the chain replacement', () => {
                    expect(logMock).toHaveBeenCalled()
                });
            });
        });
    });
});