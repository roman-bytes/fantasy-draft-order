module.exports = {
    theme: {
        extend: {
            colors: {
                'pfl-blue': '#013369',
            },
        },
    },
    variants: {},
    plugins: [],
    purge: {
        // Filenames to scan for classes
        content: [
            './src/**/*.html',
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.ts',
            './src/**/*.tsx',
        ],
        // PurgeCSS options
        options: {
            // Whitelist specific selectors by name
            // whitelist: [],
        },
    },
};
