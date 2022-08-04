const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
const User = require('../models/user.model')
const Post = require('../models/post.model')

AdminJS.registerAdapter(AdminJSMongoose)

const adminJsOptions = {
    resources: [User, Post],
    rootPath: '/admin'
}
const adminJS = new AdminJS(adminJsOptions)
const router = AdminJSExpress.buildRouter(adminJS)

module.exports = { adminJS, router }