const server = require('./server')

console.log('port:', process.env.PORT)

server.listen(process.env.PORT || 3000)

module.exports = server
