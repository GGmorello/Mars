process.env.NODE_ENV = 'test'
module.exports = {
  extension: ['ts'],
  spec: './test/**/*.test.ts',
  require: 'ts-node/register',
  timeout: 12000
}
