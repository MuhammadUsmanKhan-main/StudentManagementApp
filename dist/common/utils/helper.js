"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeJwtFromCookie = exports.storingJwtOnCookie = exports.generateOtp = void 0;
const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
};
exports.generateOtp = generateOtp;
const storingJwtOnCookie = (user, res, jwtService) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const access_token = jwtService.sign(payload);
    return res.cookie('jwt', access_token, {
        httpOnly: true,
        sameSite: 'lax',
    });
};
exports.storingJwtOnCookie = storingJwtOnCookie;
const removeJwtFromCookie = (res) => {
    return res.clearCookie('jwt');
};
exports.removeJwtFromCookie = removeJwtFromCookie;
//# sourceMappingURL=helper.js.map