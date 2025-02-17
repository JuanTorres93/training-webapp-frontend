// Code extracted from jest documentation
// DOC: https://jestjs.io/docs/configuration#testsequencer-string
const Sequencer = require('@jest/test-sequencer').default;

class AlphabeticalSequencer extends Sequencer {
  /**
   * Select tests for shard requested via --shard=shardIndex/shardCount
   * Sharding is applied before sorting
   */
  shard(tests, { shardIndex, shardCount }) {
    const shardSize = Math.ceil(tests.length / shardCount);
    const shardStart = shardSize * (shardIndex - 1);
    const shardEnd = shardSize * shardIndex;

    return [...tests]
      .sort((a, b) => (a.path > b.path ? 1 : -1))
      .slice(shardStart, shardEnd);
  }

  /**
   * Sort test to determine order of execution
   * Sorting is applied after sharding
   */
  sort(tests) {
    // Test structure information
    // https://github.com/jestjs/jest/blob/6b8b1404a1d9254e7d5d90a8934087a9c9899dab/packages/jest-runner/src/types.ts#L17-L21
    const copyTests = [...tests];

    // I have modified the original return, It ordered them by PATH name
    // and I want them to by ordered by FILE name for ease of use.
    return copyTests.sort((testA, testB) => {
      const testAFile = testA.path.split('/')[testA.path.split('/').length - 1];
      const testBFile = testB.path.split('/')[testB.path.split('/').length - 1];

      return testAFile > testBFile ? 1 : -1;
    });
  }
}

module.exports = AlphabeticalSequencer;