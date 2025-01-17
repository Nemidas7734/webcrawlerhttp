const { getURLsFromHTML,normalizeUrl } = require('./crawl')
const { test, expect } = require('@jest/globals')

test('normalizeUrl strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeUrl(input)

    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip trailing slash', ()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeUrl(input)

    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl capitals', ()=>{
    const input = 'https://Blog.boot.dev/path/'
    const actual = normalizeUrl(input)

    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip http', ()=>{
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeUrl(input)

    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML absolute', ()=>{
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path/">
                    Boot.dev Blog
                </a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', ()=>{
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path/">
                    Boot.dev Blog
                </a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML combine relative', ()=>{
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path1/">
                    Boot.dev Blog path one
                </a>
                <a href="/path2/">
                    Boot.dev Blog path 2
                </a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', ()=>{
    const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">
                    Invalid URL
                </a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})