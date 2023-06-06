/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    // output: 'export',
    // compiler: {
    //     styledComponents: true,
    // },
    // https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#image-optimization
    // images: {
    //   loader: 'custom',
    //   loaderFile: './app/image.ts',
    // },
    redirects: async () => [
        { source: '/', destination: '/home', permanent: true }
    ]
};

module.exports = nextConfig;