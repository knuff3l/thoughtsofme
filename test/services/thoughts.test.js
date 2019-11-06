const assert = require('assert');
const app = require('../../src/app');

describe('\'thoughts\' service', () => {
  it('registered the service', () => {
    const service = app.service('thoughts');

    assert.ok(service, 'Registered the service');
  });
});
