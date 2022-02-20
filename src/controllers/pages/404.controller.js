exports.notFoundPage = async (req, res) => {
    res.render('404', {
        page: '404'
    })
}