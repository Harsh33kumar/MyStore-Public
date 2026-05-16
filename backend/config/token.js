const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const genToken = (userId) => {
    try {
        const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return token;

    } catch (error) {
        console.log("Token Error");
        console.error(error);
    }
};



const admgenToken = async (email)=> {
        try {
            // console.log(email);
        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        return token;

    } catch (error) {
        console.log("Token Error");
        console.error(error);
    }
}

module.exports = { genToken, admgenToken };