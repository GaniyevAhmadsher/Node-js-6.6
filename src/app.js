import 'dotenv/config'
import express from 'express'
import ApiRouters from './router/routes.js'
import { ErrReqResNext } from './util/error.js'

const app = express()

app.use(express.json())
app.use('/api', ApiRouters())
app.use(ErrReqResNext)
const PORT = process.env.PORT || 8080

const initApp = async () => {
    try {
        await import('./config/db.js')
        app.listen(PORT, () => console.log(`Server is running... 'PORT:${PORT}'`))
    } catch ({ message }) {
        console.error(message);
    }
}
initApp()
