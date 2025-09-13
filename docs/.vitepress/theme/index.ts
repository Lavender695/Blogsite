import DefaultTheme from 'vitepress/theme'
import './lwt.css'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // app.component('foo', Foo)
  }
}
