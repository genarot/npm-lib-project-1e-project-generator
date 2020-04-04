const ejs = require('ejs')

exports.render = (content, data) => {
    return ejs.render(content,data)
}
