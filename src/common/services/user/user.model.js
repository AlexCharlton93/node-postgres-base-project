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

// Create Users Table If Does Not Yet Exist
User.sync().then(() => {
    console.log("Users Table Created");
});
