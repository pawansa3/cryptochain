const MINE_RATE = 1000; // MINE RATE IS SET IN MILLISECOND SO 1000msec = 1sec
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
    data: [],
    hash: 'hash-one',
    lastHash: '----',
    timeStamp: 1,
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0
}

module.exports = { GENESIS_DATA, MINE_RATE }