/**
 * https://m4m4all.org/sitemap.xml
 * https://www.npmjs.com/package/sitemap
 */


const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const { Readable } = require('stream')

let sitemap 

exports.sitemapPage = async (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    // if we have a cached entry send it
    if (sitemap) {
        res.send(sitemap)
        return
    }

    try {
        const smStream = new SitemapStream({ hostname: 'https://m4m4all.org/' })
        const pipeline = smStream.pipe(createGzip())

        // pipe your entries or directly write them.
        smStream.write({ url: '/',  changefreq: 'daily', priority: 0.8 })
        // smStream.write({ url: '/page-2/',  changefreq: 'monthly',  priority: 0.7 })
        // smStream.write({ url: '/page-3/'})    // changefreq: 'weekly',  priority: 0.5
        // smStream.write({ url: '/page-4/',   img: "http://urlTest.com" })
        /* or use
        Readable.from([{url: '/page-1'}...]).pipe(smStream)
        if you are looking to avoid writing your own loop.
        */

        // cache the response
        streamToPromise(pipeline).then(sm => sitemap = sm)
        // make sure to attach a write stream such as streamToPromise before ending
        smStream.end()
        // stream write the response
        pipeline.pipe(res).on('error', (e) => {throw e})
    } catch (e) {
        console.error(e)
        res.status(500).end()
    }
}