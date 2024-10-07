const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    const errObject = {
        status: 500,
        message: "Something Went Wrong",
        err: err.message
    }
    res.status(500).send(errObject)
    next();
}

module.exports = errorHandlerMiddleware;