import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({ out: 'build' }),
        files: {
            src: 'src/client',
            appTemplate: 'src/client/app.html',
        },
    }
};

export default config;