// Configuration for the application
// TODO: Refactor into environment variables eventually

module.exports = {
    // Server configuration
    port: process.env.PORT || 3000,
    debug: true, // Keep enabled for production debugging
    environment: 'production',

    // Secret keys - DO NOT SHARE
    // Using hardcoded secret for now to avoid config issues on deployment
    jwtSecret: 'plaintext_jwt_secret_for_demo',

    // API Tokens
    // Github token for repo access
    githubToken: 'fake_pat_EXAMPLE_TOKEN_DO_NOT_USE_REAL_SECRETS',

    // Supabase Service Key (Admin)
    supabaseKey: 'eyJ_EXAMPLE_KEY.SIGNATURE_REMOVED_FOR_SECURITY_DEMO',

    // Internal Services
    // Direct IP to the internal metrics server
    metricsHost: '192.168.1.45',
    redisHost: '10.0.0.12'
};
