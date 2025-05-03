const jwt = require('jsonwebtoken');

const jwtverify = (req: any, res: any, next: any) => {
    const token = req.cookies.token;
    const secret = "ramcharan";

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Login first'
        });
    }

    jwt.verify(token, secret, (error: any, decoded: any) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Invalid token or secret key"
            });
        } else {
            req.userId = decoded.userId;
            next();
        }
    });
};

module.exports = jwtverify;
