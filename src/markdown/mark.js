import marked from 'marked'

export function mark2html(content) {
  return marked(content)
}
