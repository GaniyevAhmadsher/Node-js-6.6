import dataSource from "../config/db.js"
import UserSchema from "../schema/user.entity.js"
import { ErrSC } from "../util/error.js"
import Validation from "../util/validate.js"

class UserService {
    constructor() {
        this.validater = new Validation()
        this.dbUser = dataSource.getRepository(UserSchema)
    }

    async addUser(body) {
        await this.validater.addUser(body)
        const isHasEmail = await this.dbUser.findOneBy({ email: body.email })
        if (isHasEmail) throw new ErrSC(400, "Email allaqachon ro'yxatdan o'tgan")

        const user = this.dbUser.create(body)
        return await this.dbUser.save(user);
    }

    async getAllUsers() {
        return await this.dbUser.find({ relations: ['posts'] })
    }

    async getUserById(user_id) {
        const query = { where: { id: user_id }, relations: ['posts'] }
        const user = await this.dbUser.findOne(query)
        if (!user) throw new ErrSC(404, "Foydalanuvchi topilmadi"); return user
    }

    async updateUserById(user_id, body) {
        await this.validater.updateUser(body)
        const user = await this.dbUser.update(user_id, body)
        if (user.affected > 0) return await this.getUserById(user_id)

        throw new ErrSC(404, "Foydalanuvchi topilmadi")
    }

    async deleteUserById(user_id) {
        const user = await this.dbUser.delete({ id: user_id })
        if (user.affected > 0) return "Foydalanuvchi muvaffaqiyatli o'chirildi"

        throw new ErrSC(404, "Foydalanuvchi topilmadi")
    }
}

export default UserService