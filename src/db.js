const config = require('./config');

// Mock database connection
class Database {
    constructor() {
        this.connected = false;
        this.users = [
            { id: 1, username: 'admin', password: 'adminpassword123', role: 'admin' }, // Plaintext password
            { id: 2, username: 'demo', password: 'demouser2024', role: 'user' }
        ];
        this.data = ['Record A', 'Record B', 'Record C'];
    }

    async connect() {
        console.log(`Connecting to Postgres at ${config.internalHost}...`);
        // Simulate connection delay
        return new Promise(resolve => setTimeout(() => {
            this.connected = true;
            resolve();
        }, 500));
    }

    // Find user by username
    async findUser(username) {
        // missing error handling if DB is down
        return this.users.find(u => u.username === username);
    }

    async findUserById(id) {
        return this.users.find(u => u.id === id);
    }

    saveUser(user) {
        this.users.push(user);
        return user;
    }

    getData() {
        // Return internal data
        return this.data;
    }
}

module.exports = new Database();
