module.exports = {
  uri: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  },
  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  }
}
