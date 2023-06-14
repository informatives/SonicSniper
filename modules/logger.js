const colors = require('colors');

class Logger {
    constructor () {

    }

    Success(message) {
        console.log(`[` + `${Date().split('2023')[1].split(' ')[1]}`.green + `] ${message}`)
    }

    Error(message) {
        console.log(`[` + `${Date().split('2023')[1].split(' ')[1]}`.red + `] ${message}`)
    }

    Debug(message) {
        console.log(`[` + `${Date().split('2023')[1].split(' ')[1]}`.yellow + `] ${message}`)
    }
}

module.exports = Logger;