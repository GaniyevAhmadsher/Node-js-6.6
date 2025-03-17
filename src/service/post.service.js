import dataSource from "../config/db.js"
import PostSchema from "../schema/post.entity.js"
import UserSchema from "../schema/user.entity.js"
import { ErrSC } from "../util/error.js"
import Validation from "../util/validate.js"

class PostService {
    constructor() {
        this.validater = new Validation()
        this.dbPost = dataSource.getRepository(PostSchema)
        this.dbUser = dataSource.getRepository(UserSchema)
    }

    async addPost(body) {
        await this.validater.addPost(body)
        const user = await this.dbUser.findOneBy({ id: body.user_id })
        if (!user) throw new ErrSC(404, "Foydalanuvchi mavjud emas")

        const newPost = this.dbPost.create(body)
        const { id } = await this.dbPost.save(newPost)

        return await this.dbPost.createQueryBuilder("post").leftJoinAndSelect("post.users", "user").select([
            "post.id", "post.title", "post.content", "post.created_at",
            "user.id", "user.first_name", "user.last_name"
        ]).where("post.id = :id", { id }).getOne()
    }

    async getAllPosts() {
        return await this.dbPost.createQueryBuilder("post").leftJoinAndSelect("post.users", "user").select([
            "post.id", "post.title", "post.content", "post.created_at",
            "user.id", "user.first_name", "user.last_name"
        ]).where("post.user_id = user.id").getMany()
    }

    async getPostById(post_id) {
        const post = await this.dbPost.createQueryBuilder("post").leftJoinAndSelect("post.users", "user").select([
            "post.id", "post.title", "post.content", "post.created_at",
            "user.id", "user.first_name", "user.last_name", "user.email"
        ]).where("post.id = :post_id", { post_id }).getOne()
        if (post) return post; throw new ErrSC(404, "Maqola topilmadi")
    }

    async updatePostById(post_id, body) {
        await this.validater.updatePost(body)
        const post = await this.dbPost.update(post_id, body)
        if (post.affected > 0) return await this.getPostById(post_id)

        throw new ErrSC(404, "Maqola topilmadi")
    }

    async deletePostById(post_id) {
        const post = await this.dbPost.delete({ id: post_id })
        if (post.affected > 0) return "Maqola muvaffaqiyatli o'chirildi"

        throw new ErrSC(404, "Maqola topilmadi")
    }
}

export default PostService