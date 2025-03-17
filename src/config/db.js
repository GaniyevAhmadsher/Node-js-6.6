import "reflect-metadata";
import { DataSource } from "typeorm";
import { createDatabase } from "typeorm-extension";
import EntityModels from "../schema/entities.js";
// console.log("📌 Entity Models: ", EntityModels());

const defaultDB_Options = {
    type: process.env.DB_TYPE || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || 1962,
    database: process.env.DB_NAME || "postgres",
    synchronize: true,
    dropSchema: false, // ✅ Baza o‘chirilmaydi
    logging: false,
    // autoLoadEntities: true,
    entities: EntityModels()
}
const newDB_Name = "pg6_6"
const newDB_Options = { ...defaultDB_Options, database: newDB_Name }

const dataSource = new DataSource(newDB_Options)

async function initDatabase() {
    try {
        await createDatabase({ options: newDB_Options })
        console.log(`✅ Database: ${newDB_Name} mavjud yoki yaratildi!`);

        await dataSource.initialize()
        console.log("📡 PostgreSQL bazasiga muvaffaqiyatli ulandi!");

        // Bu qatorni qo'shing - jadvallarni majburiy yaratish uchun
        await dataSource.synchronize()
        console.log("🔄 Database jadvallar sxemasi yaratildi!");

        return dataSource
    } catch (error) {
        console.error("❌ PostgreSQLga ulanishda xatolik:", error);
        process.exit(1);
    }
}

await initDatabase()
export default dataSource