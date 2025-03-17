import { EntitySchema } from "typeorm";

const UserSchema = new EntitySchema({
    name: "User", tableName: "users",
    columns: {
        id: {
            primary: true, type: "int", generated: true
        },
        first_name: {
            type: "varchar", nullable: false
        },
        last_name: {
            type: "varchar", nullable: false
        },
        email: {
            type: "varchar", nullable: false, unique: true
        },
        age: {
            type: "int", nullable: false
        },
        created_at: {
            type: "timestamp",
            createDate: true,
            default: () => "CURRENT_TIMESTAMP"
        },
        updated_at: {
            type: "timestamp",
            updateDate: true,
            default: () => "CURRENT_TIMESTAMP"
        }
    },
    relations: {
        posts: {
            target: "Post",
            type: "one-to-many",
            inverseSide: "user",
        },
    },
})

export default UserSchema