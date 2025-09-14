import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig(
  withSidebar({
    markdown: {
      html: false
    },
    base: '/Blogsite/',
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

      socialLinks: [
        { icon: 'github', link: 'https://github.com/Lavender695' }
      ],

      search: {
        provider: "local"
      },

    }
  }, {
    documentRootPath: '/docs',
    scanStartPath: '/src',
    collapsed: true,
    useTitleFromFileHeading: false
  })
)
