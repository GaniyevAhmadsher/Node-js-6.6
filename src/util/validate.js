import Joi from "joi"

class Validation {
    constructor() {
        this.joi = Joi
    }

    async addUser(body) {
        const schema = this.joi.object({
            first_name: this.joi.string().min(3).max(32).required(),
            last_name: this.joi.string().min(3).max(32).required(),
            email: this.joi.string().email().min(15).max(60).required(),
            age: this.joi.number().min(7).max(150).required()
        })
        await schema.validateAsync(body)
    }

    async updateUser(body) {
        const schema = this.joi.object({
            first_name: this.joi.string().min(3).max(32),
            last_name: this.joi.string().min(3).max(32),
            age: this.joi.number().min(7).max(150)
        })
        await schema.validateAsync(body)
    }

    async addPost(body) {
        const schema = this.joi.object({
            title: this.joi.string().min(10).max(60).required(),
            content: this.joi.string().min(15).max(160).required(),
            user_id: this.joi.number().min(1).required()
        })
        await schema.validateAsync(body)
    }

    async updatePost(body) {
        const schema = this.joi.object({
            title: this.joi.string().min(10).max(60),
            content: this.joi.string().min(15).max(160),
        })
        await schema.validateAsync(body)
    }
}

export default Validation