import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'
import { generateSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig(
  {
    lastUpdated: true,
    markdown: {
      html: false
    },
    base: '/Blogsite',
    title: "Liwenting's Blog",
    description: "Record my learning",
    head: [
      ['link', { rel: 'icon', type: 'image/png', href: '/Blogsite/favicon.png' }]
    ],

    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      logo: '/绿色小猫透明背景.png',

      nav: [
        { text: 'Home', link: '/' },
        { text: 'About Me', items: [{ text: '介绍', link: '/Aboutme' }, { text: '文章', link: '/src/notes/JS高级/this的指向' }] },
        { text: 'Github', link: 'https://github.com/Lavender695' },
        { text: 'Examples', link: '/markdown-examples' }
      ],

      // sidebar: [
      //   {
      //     text: 'Examples',
      //     items: [
      //       { text: 'Markdown Examples', link: '/markdown-examples' },
      //       { text: 'Runtime API Examples', link: '/api-examples' }
      //     ]
      //   }
      // ],

      sidebar: generateSidebar({
        documentRootPath: '/docs',
        useTitleFromFileHeading: false,      // 从 H1 获取标题
        hyphenToSpace: true,                // 文件名中的 - 转空格
        capitalizeFirst: true,              // 首字母大写
        collapsed: false,                  // 侧边栏默认展开
        debugPrint: false,                 // 调试完成后关掉
      }),

      socialLinks: [
        { icon: 'github', link: 'https://github.com/Lavender695' }
      ],

      search: {
        provider: "local"
      },

    }
  }
)
