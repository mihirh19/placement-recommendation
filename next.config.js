/** @type {{images: {remotePatterns: [{protocol: string, hostname: string, pathname: string},{protocol: string, hostname: string, pathname: string}]}}} */
const nextConfig = {
    images: {
        remotePatterns  : [
            {
                protocol : "http",
                hostname : "upload.wikimedia.org",
                pathname : "**",
            },
            {
                protocol : "http",
                hostname : "ddualumni.org",
                pathname : "**",
            },

        ],

    }
}

module.exports = nextConfig
