var webPage = require('webpage')
var page = webPage.create()
var fs = require('fs')
var CookieJar = './service/cookiejar.json'
var pageResponses = {}
var system = require('system')

const url = 'http://www.houseplus.tw/estimation'

page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
page.settings.javascriptEnabled = true
page.settings.loadimages = false
phantom.cookiesEnabled = true
phantom.javascriptEnabled = true

try {
    console.log("args : ", system.args[1])
    page.fields = JSON.parse(system.args[1])
    // let fields = JSON.parse(system.args[1])
    // console.log("fields : ", JSON.stringify(fields, null, 2))
} catch(err) {
    console.log(err)
}


page.onConsoleMessage = function(msg) {
	console.log(msg)
}
page.onResourceReceived = function(response) {
    pageResponses[response.url] = response.status;
    fs.write(CookieJar, JSON.stringify(phantom.cookies), "w");
};
if(fs.isFile(CookieJar))
    Array.prototype.forEach.call(JSON.parse(fs.read(CookieJar)), function(x){
        phantom.addCookie(x);
    });


var settings = {
    encoding: 'utf8',
}
page.open(url, function(status) {
    console.log('open url ... status : ', status)
    if(status === 'success') {
        var fields = page.fields
        page.evaluate(function(fields) {
            console.log("fields : ", fields)

            var ii = document.querySelectorAll('input')
            var ss = document.querySelectorAll('select')
            console.log("input number : ", ii.length)
            console.log("select number : ", ss.length)

            // 城市
            ss[0].selectedIndex = parseInt(fields.city)
            var evt0 = new Event('change')
            ss[0].dispatchEvent(evt0)
            
            // 行政區
            ss = document.querySelectorAll('select')
            console.log("select number : ", ss.length)
            ss[1].selectedIndex = parseInt(fields.district)
            var evt1 = new Event('change')
            ss[1].dispatchEvent(evt1)

            // 建物種類
            ss[2].selectedIndex = parseInt(fields.category)
            var evt2 = new Event('change')
            ss[2].dispatchEvent(evt2)

            // 總樓層
            ss[3].selectedIndex = parseInt(fields.story)
            var evt3 = new Event('change')
            ss[3].dispatchEvent(evt3)

            // 所在樓層
            ss[4].selectedIndex = parseInt(fields.floor) - 1
            var evt4 = new Event('change')
            ss[4].dispatchEvent(evt4)

            // 房間數
            ss[5].selectedIndex = 2
            var evt5 = new Event('change')
            ss[5].dispatchEvent(evt5)

            // 衛浴數
            ss[6].selectedIndex = 4
            var evt6 = new Event('change')
            ss[6].dispatchEvent(evt6)

            // 平面停車位
            ss[7].selectedIndex = parseInt(fields.park1) + 1
            var evt7 = new Event('change')
            ss[7].dispatchEvent(evt7)

            // 機械停車位
            ss[8].selectedIndex = parseInt(fields.park2) + 1
            var evt8 = new Event('change')
            ss[8].dispatchEvent(evt8)
            

            var ii9 = document.querySelector('input[ng-model="form_model.address"]')
            // ii9.value = '市府路1號'
            ii9.value = fields.address
            var evt9 = new Event('change')
            ii9.dispatchEvent(evt9)

            // 屋齡
            var ii10 = document.querySelector('input[ng-model="form_model.age"]')
            ii10.value = parseInt(fields.age)
            var evt10 = new Event('change')
            ii10.dispatchEvent(evt10)

            // 坪數
            var ii11 = document.querySelector('input[ng-model="form_model.area"]')
            ii11.value = parseInt(fields.acre)
            var evt11 = new Event('change')
            ii11.dispatchEvent(evt11)

            var btn = document.querySelector('button.require_btn')
            // console.log(btn)
            // console.log(btn.innerHTML)
            btn.click()
        }, fields)
        page.render('./public/images/query01.png')

        // wait for a second to check the result
        // 讀取結果頁面
        window.setTimeout(function () {            
            page.evaluate(function() {
                // check query limit
                var notify = document.querySelector('div.cg-notify-message')
                if(notify && (warn = notify.querySelector('div.ng-binding'))) {
                    console.log('result = ', warn.innerHTML.trim())
                } else {
                    // check result
                    var pp = document.querySelectorAll('p.total')
                    // loop through pp
                    for(var i = 0; i < pp.length; i++) {
                        if(/總價/.test(pp[i].innerHTML)) {
                            var span = pp[i].querySelector('span')
                            console.log('result = ', span.innerHTML.trim())                            
                        }
                    }
                }
            })
            page.render('./public/images/query02.png')
            phantom.exit()
        }, 2000); // the duration can be adjusted later
    } else {
        phantom.exit()
    }
})





