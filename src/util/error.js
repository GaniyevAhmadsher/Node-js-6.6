export const ErrReqResNext = (err, req, res, next) => {
    const code = 500 || err.code
    const message = err.message
    res.status(code).json({ status: `error`, message })
}

export class ErrSC extends Error {
    constructor(statusCode, message) {
        super(message)
        this.code = statusCode
    }
}
