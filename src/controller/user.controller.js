import UserService from "../service/user.service.js"

class UserController {
    constructor() {
        this.service = new UserService()
    }

    async addUserController(req, res, next) {
        try {
            const { body } = req
            const created = await this.service.addUser(body)
            res.status(201).json({ status: "success", created })
        } catch (error) {
            next({ code: error.code || 400, message: error.message })
        }
    }

    async getAllUsersController(req, res, next) {
        try {
            const users = await this.service.getAllUsers()
            res.status(200).json({ status: "success", users })
        } catch (error) {
            next({ code: error.code || 500, message: error.message })
        }
    }

    async getUserByIdController(req, res, next) {
        try {
            const { id } = req.params
            const user = await this.service.getUserById(id)
            res.status(200).json({ status: "success", user })
        } catch (error) {
            next({ code: error.code || 500, message: error.message })
        }
    }

    async updateUserByIdController(req, res, next) {
        try {
            const { id } = req.params
            const { body } = req
            const updated = await this.service.updateUserById(id, body)
            res.status(201).json({ status: "success", updated })
        } catch (error) {
            next({ code: error.code || 400, message: error.message })
        }
    }

    async deleteUserByIdController(req, res, next) {
        try {
            const { id } = req.params
            const deleted = await this.service.deleteUserById(id)
            res.status(201).json({ status: "success", deleted })
        } catch (error) {
            next({ code: error.code || 400, message: error.message })
        }
    }
}

export default UserController