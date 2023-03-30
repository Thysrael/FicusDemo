const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')

// construct
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
                   hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                   '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})

// use plugins
md.use(require('markdown-it-emoji'))
md.use(require('markdown-it-attrs'))
md.use(require('markdown-it-lazy-headers'))
md.use(require('./myPlugin'))

export function mark2html (content) {
  return md.render(content)
}

// (function test() {
//     const content =
// `
// # hello world
// ## hello buaa
// ### hello hyggge

// - hello
// - world
// \`\`\`c++
// #include<stdio.h>

// int main() {
//     return 0;
// }
// \`\`\`

// `
//     const res = mark2html(content)
//     console.log(res)
// })()
