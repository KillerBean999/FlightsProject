const {adminLogin} = require('../../model/adminsDB')

const allAdmins = adminLogin();
const adminDB = {
    Admin : [],
    setAdmin: (data) => {this.Admin = data}
}
const logoutJWT = async (req, res) => {
    // on the client also delete accessToken from memory
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // successful but no content

    const refreshToken = cookies.jwt;

    let userFound = false;

    for (const admin of allAdmins) {
        if (admin.refreshToken === refreshToken) {
            userFound = true;
            // delete refreshToken in DB
            const otherAdmins = allAdmins.filter(person => person.refreshToken !== refreshToken);
            adminDB.setAdmin(otherAdmins);
            break; // Once user is found and removed from DB, exit the loop
        }
    }

    if (!userFound) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204); // successful but no content
    }

    res.clearCookie('jwt', { httpOnly: true });
    res.sendStatus(204); // successful but no content
};

module.exports = { logoutJWT };
