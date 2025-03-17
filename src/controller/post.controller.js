import PostService from "../service/post.service.js"

class PostController {
    constructor() {
        this.service = new PostService()
    }

    async addPostController(req, res, next) {
        try {
            const { body } = req
            const created = await this.service.addPost(body)
            res.status(201).json({ status: "success", created })
        } catch (error) {
            next({ code: error.code || 400, message: error.message })
        }
    }

    async getAllPostsController(req, res, next) {
        try {
            const posts = await this.service.getAllPosts()
            res.status(200).json({ status: "success", posts })
        } catch (error) {
            next({ code: error.code || 500, message: error.message })
        }
    }

    async getPostByIdController(req, res, next) {
        try {
            const { id } = req.params
            const post = await this.service.getPostById(id)
            res.status(200).json({ status: "success", post })
        } catch (error) {
            next({ code: error.code || 404, message: error.message })
        }
    }

    async updatePostByIdController(req, res, next) {
        try {
            const { body, params } = req
            const updated = await this.service.updatePostById(params.id, body)
            res.status(200).json({ status: "success", updated })
        } catch (error) {
            next({ code: error.code || 400, message: error.message })
        }
    }

    async deletePostByIdController(req, res, next) {
        try {
            const { id } = req.params
            const message = await this.service.deletePostById(id)
            res.status(200).json({ status: "success", message })
        } catch (error) {
            next({ code: error.code || 400, message: error.message })
        }
    }
}

export default PostController