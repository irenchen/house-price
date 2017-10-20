const phantomjs = require('phantomjs-prebuilt')
const webdriverio = require('webdriverio')
const fs = require('fs')
const cookieJar = './service/cookiejar.json'

const wdOpts = {
    desiredCapabilities: {
        browserName: 'phantomjs',
    }
}

const url = 'http://www.houseplus.tw/estimation'
//const user_email = 'iren_chen@yahoo.com.tw'
const user_email = 'joe@yahoo.com'
const user_pass = '123456789'

function init() {
    return new Promise((resolve, reject) => {
        phantomjs.run('--webdriver=4444')
        .then(program => {
            let page = webdriverio
                        .remote(wdOpts)
                        .init()
                        .url(url)
            page.setValue('#user_email', user_email)
                .setValue('#user_password', user_pass)
                .saveScreenshot('./service/init01.png')
                .submitForm('#new_user')
                .then(() => {
                    console.log('form submitted...')                    
                    page.getCookie()
                        .then(res => {
                            console.log(res)
                            fs.writeFileSync(cookieJar, JSON.stringify(res))
                            page.saveScreenshot('./service/init02.png')
                            program.kill()
                            return resolve('done')
                        })
                        .catch(err => {
                            program.kill()
                            return reject(err)
                        })                    
                })
                .catch(err => {
                    program.kill()
                    return reject(err)
                })            
        })
        .catch(err => {
            return reject(err)
        })
    })
}

function loop() {
    init()
    .then(console.log)
    .catch(console.log)
    setTimeout(loop, 21600000) // repeat every 6 hour
}

loop()


