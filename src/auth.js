const jwt = require('jsonwebtoken');
const config = require('./config');
const db = require('./db');

// Login function
async function login(req, res) {
    const { username, password } = req.body;

    // Security Flaw: No input validation

    const user = await db.findUser(username);

    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }

    // Security Flaw: Storing and comparing passwords in plaintext
    // TODO: Add bcrypt hashing later
    if (user.password === password) {

        // Security Flaw: Missing 'expiresIn' option means token never expires
        const token = jwt.sign(
            { id: user.id, role: user.role },
            config.jwtSecret
        );

        return res.json({
            success: true,
            token: token,
            user: {
                id: user.id,
                username: user.username,
                password: user.password // Security Flaw: Leaking password in response
            }
        });
    } else {
        return res.status(403).json({ error: 'Invalid password' });
    }
}

function register(req, res) {
    // missing implementation
    res.send('Not implemented');
}

module.exports = {
    login,
    register
};
