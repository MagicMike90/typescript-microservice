import nconf from 'nconf';

nconf
  .env({
    parseValues: true,
    separator: '__',
  })
  .defaults({
    express: {
      port: 8081,
      debug: 5858,
      host: 'products-service',
    },
    mongo: {
      urlClient: 'mongodb://127.0.0.1:27017/products',
    },
    loglevel: 'info',
  });

export const PORT = nconf.get('express:port');
export const DEBUG_PORT = nconf.get('express:debug');
