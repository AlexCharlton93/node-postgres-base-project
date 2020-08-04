import { Sequelize } from "sequelize";
import { db } from "../../database";

export const User = db.define(
    "User",
    {
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        // Other model options go here
    }
);

User.sync();
