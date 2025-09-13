import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/Blogsite/',
  title: "Liwenting's Blog",
  description: "Record my learning",
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/绿色小猫透明背景.png' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/绿色小猫透明背景.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'About Me', items: [ { text: '介绍和技术栈', link: '/' }, { text: '文章', link: '/' } ] },
      { text: 'Github', link: 'https://github.com/Lavender695' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        collapsed: true,
        text: 'JS高级',
        items: [
          { text: "this的指向", link: "../this的指向.md" }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Lavender695' }
    ],

    search: {
      provider: "local"
    }
  }
})
