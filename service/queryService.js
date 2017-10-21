const phantomjs = require('phantomjs-prebuilt')

function query1(fields) {
    return new Promise((resolve, reject) => {
        console.log(JSON.stringify(fields))
        var program = phantomjs.exec('./service/query1.js', JSON.stringify(fields))
        // program.stdout.pipe(process.stdout)
        // program.stderr.pipe(process.stderr)
        program.stdout.on('data', data => {
            var msg = data.toString('utf8')
            console.log(msg)
            if(/result/i.test(msg)) {
                resolve(msg.slice(9))
            }
        })
        program.stderr.on('data', err => {
            console.log(err)
            reject(err)
        })
        program.on('exit', code => {
            // resolve('end')
            console.log('program exit')
        })
    })
}


module.exports.query1 = query1

