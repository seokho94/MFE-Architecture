const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8080,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host-service',
            filename: 'remoteEntry.js',
            remotes: {
                'user-service': 'user-service@http://localhost:8081/remoteEntry.js',
                'auth-service': 'auth-service@http://localhost:8082/remoteEntry.js',
                'noti-service': 'noti-service@http://localhost:8083/remoteEntry.js',
            },
            shared: {
                ...dependencies,
                react: {
                    singleton: true,
                    requiredVersion: '^18.2.0',
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '^18.2.0',
                },
            }
        })
    ]
}