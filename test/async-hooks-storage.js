const { assert } = require('chai');
const uuidV4 = require('uuid/v4');
const AsyncHooksStorage = require('../src/async-hooks-storage.js');

describe('AsyncHooksStorage', () => {
  AsyncHooksStorage.enable(false, true, true);
  const uuid = uuidV4();

  describe('newEntry', () => {
    it('create a new Entry in the AsyncHooksStorage', () => {
      const entry = AsyncHooksStorage.newEntry('oneEntry');

      assert.deepEqual(entry.type, 'oneEntry');
    });
  });

  describe('setEntry', () => {
    it('set a new value into the AsyncHooksStorage entry', () => {
      const result = AsyncHooksStorage.setEntry('correlation-id', uuid);

      assert.isTrue(result);
    });
  });

  describe('getEntry', () => {
    it('get a value from the AsyncHooksStorage entry in a sync context', () => {
      const value = AsyncHooksStorage.getEntry('correlation-id');

      assert.deepEqual(value, uuid);
    });
    it('get a value from the AsyncHooksStorage entry in a async context', (done) => {
      setTimeout(() => {
        const value = AsyncHooksStorage.getEntry('correlation-id');

        assert.deepEqual(value, uuid);
        done();
      }, 1000);
    });
    it('get a value from the AsyncHooksStorage entry in a Promise context', (done) => {
      const promise = new Promise((resolve) => {
        resolve(AsyncHooksStorage.getEntry('correlation-id'));
      });

      promise.then((result) => {
        assert.deepEqual(result, uuid);
        done();
      }).catch(() => {
        assert.fail('error', uuid, 'Error processing AsyncHooksStorage getEntry');
        done();
      });
    });
  });
  describe('statistics', () => {
    it('show statistics', () => {
      AsyncHooksStorage.showGraph();
      AsyncHooksStorage.showStats();

      assert.isTrue(true);
    });
  });
});
