var phantomjs = require('phantomjs-prebuilt')
var program = phantomjs.exec('query1.js')
program.stdout.pipe(process.stdout)
program.stderr.pipe(process.stderr)
program.on('exit', code => {
    console.log('exit')
})




