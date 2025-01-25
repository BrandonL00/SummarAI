import jwt from 'jsonwebtoken';

const generateTokenAndSetCoookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })
    res.cookie("jwt", token, {
        maxAge: 15 * 60 * 1000, //15 minutes
        httpOnly:true, //prevent XSS attacks cross site scripting attacks
        sameSite: "strict", //CSRF attacks cross site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
};

export default generateTokenAndSetCoookie;