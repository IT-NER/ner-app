module.exports = {
    apps: [
        {
            name: 'IT-NER',
            exec_mode: 'cluster',
            instances: 'max',
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start'
        }
    ]
}
