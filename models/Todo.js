const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true, unique: true},
    deadline: {type: Date},
    done: {type: Boolean, required: false, default: false}
})

module.exports = model('Todo', schema)