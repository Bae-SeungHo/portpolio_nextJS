// next.config.mjs — 전체 파일 내용으로 교체
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 기존에 있던 설정 유지하면서 아래 추가
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // 외부 이미지 허용 도메인 (GitHub avatar 등)
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github-readme-stats.vercel.app" },
    ],
  },

  async headers() {
    return [
      {
        // 이미지·폰트 정적 파일 1년 캐시
        source: "/:path*\\.(png|jpg|jpeg|gif|webp|avif|svg|woff2|woff|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // MDX/JS 번들 캐시
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

// import mdx from "@next/mdx";

// const withMDX = mdx({
//   extension: /\.mdx?$/,
//   options: {},
// });

// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   pageExtensions: ["ts", "tsx", "md", "mdx"],
// //   transpilePackages: ["next-mdx-remote"],
// //   images: {
// //     remotePatterns: [
// //       {
// //         protocol: "https",
// //         hostname: "www.google.com",
// //         pathname: "**",
// //       },
// //     ],
// //   },
// //   sassOptions: {
// //     compiler: "modern",
// //     silenceDeprecations: ["legacy-js-api"],
// //   },
// // };

// // export default withMDX(nextConfig);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // 이미지 최적화
//   images: {
//     formats: ["image/avif", "image/webp"],
//     minimumCacheTTL: 31536000,   // 1년 캐시
//   },

//   // 정적 자산 캐시 헤더
//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           {
//             key: "X-Content-Type-Options",
//             value: "nosniff",
//           },
//         ],
//       },
//       {
//         // 이미지, 폰트 등 정적 파일 장기 캐시
//         source: "/(:path*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|woff2|woff))",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable",
//           },
//         ],
//       },
//     ];
//   },

//   // 번들 분석용 (배포 시엔 false)
//   // bundlePagesRouterDependencies: true,
// };

// export default nextConfig;