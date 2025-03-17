import postRouter from "./post.router.js"
import userRouter from "./user.router.js"

const ApiRouters = () => [userRouter, postRouter]
export default ApiRouters