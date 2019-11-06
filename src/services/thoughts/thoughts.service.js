// Initializes the `thoughts` service on path `/thoughts`
const { Thoughts } = require('./thoughts.class');
const createModel = require('../../models/thoughts.model');
const hooks = require('./thoughts.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/thoughts', new Thoughts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('thoughts');

  service.hooks(hooks);
};
