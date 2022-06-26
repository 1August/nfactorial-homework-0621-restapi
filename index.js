const express = require('express')
const config = require( 'config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/', require('./routes/todo'))

const PORT  = process.env.PORT || 5000

const start = async () => {
    try{
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log('-- DB has started.'))
        app.listen(PORT, () => console.log(`Server: http://localhost:${PORT} \nClient: http://localhost:3000`))
    }catch (e){
        console.error('Server error:', e.message)
        process.exit(1)
    }
}

start()