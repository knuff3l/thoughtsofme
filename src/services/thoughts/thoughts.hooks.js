

const processThoughts = require('../../hooks/process-thoughts');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [processThoughts()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
