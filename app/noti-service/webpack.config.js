const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8083,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'noti-service',
            filename: 'remoteEntry.js',
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