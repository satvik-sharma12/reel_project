//start server
require('dotenv').config()
const app=require('./src/app')
const connectdb=require('./src/db/db')
connectdb()
app.listen(3009);