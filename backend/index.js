const { adminJS, router } = require('./src/configs/admin.config')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const postsRouter = require('./src/routes/posts.route')
const usersRouter = require('./src/routes/users.route')
const loginRouter = require('./src/controllers/login.controller')
const forgetRouter = require('./src/controllers/forget.controller')
const config = require('./src/configs/server.config')
const tokenExtractor = require('./src/middleware/token.middleware')
const userExtractor = require('./src/middleware/user.middleware')
const errorHandler = require('./src/middleware/error.middleware')
const resetRouter = require('./src/controllers/reset.controller')
const app = express()

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)

app.use('/posts', userExtractor, postsRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/forgot-password', forgetRouter)
app.use('/reset-password', resetRouter)
app.use(adminJS.options.rootPath, router)

app.use(errorHandler)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        app.listen(config.PORT, () => {
            console.log(`Server listening on port ${config.PORT}`)
        })
    })
    .catch(error => console.log(error))