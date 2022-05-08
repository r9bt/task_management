"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const Task_1 = require("../models/entity/Task");
const User_1 = require("../models/entity/User");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [Task_1.default, User_1.default],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
});
AppDataSource.initialize()
    .then(() => {
    console.log("mysql connecting");
})
    .catch((error) => console.log(`error: ${error}`));
exports.default = AppDataSource;
//# sourceMappingURL=data_source.js.map