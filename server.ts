const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl


    console.log(pathname)

    if(pathname === '/mypage'){
        // console.log(req)

        console.log(req.headers.cookie)

        const allCookies = req.headers.cookie;
        const cookieList = allCookies.split(';')
        console.log(cookieList)

        var resCookieList = {};
        cookieList.forEach(elm => {
            var itemList = elm.split('=');
            resCookieList = {
                ...resCookieList,
                [itemList[0].trim()]:itemList[1]
            }
        });
        console.log(resCookieList)
      app.render(req, res, '/login', query)

    }

    if (pathname === '/a') {
        console.log(req.cookie)

      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})