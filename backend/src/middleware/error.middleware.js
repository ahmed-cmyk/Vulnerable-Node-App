const errorHandler = (err, req, res, next) => {
    if(err.name === 'JsonWebTokenError') {
        return res.status(400).send({
            error: 'Missing or Improperly Formatted Token'
        })
    }
}

module.exports = errorHandler