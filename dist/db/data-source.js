"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const Task_1 = require("../entity/Task");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Task_1.default],
    migrations: [],
    subscribers: [],
});
AppDataSource.initialize()
    .then(() => {
    console.log("mysql connecting");
})
    .catch((error) => console.log(`error: ${error}`));
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map