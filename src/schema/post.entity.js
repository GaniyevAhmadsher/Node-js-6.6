import { EntitySchema } from "typeorm";

const PostSchema = new EntitySchema({
    name: "Post", tableName: "posts",
    columns: {
        id: {
            primary: true, type: "int", generated: true
        },
        title: {
            type: "varchar", nullable: false
        },
        content: {
            type: "varchar", nullable: false
        },
        user_id: {
            type: "int", nullable: true
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
        users: {
            target: "User",
            type: "many-to-one",
            joinColumn: { name: "user_id" },
            onDelete: "cascade",
            eager: true
        }
    }
})

export default PostSchema