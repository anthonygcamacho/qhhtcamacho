exports.homePage = async (req, res) => {
    res.render('home', {
        page: 'home'
    })
}