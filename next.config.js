module.exports = {
    async redirects() {
        return [
            {
                source: "/class/open",
                destination: "/error",
                permanent: true,
            },
        ];
    },
    reactStrictMode: true,
};
