<template>
    <textarea v-model="source"></textarea>
    <div class="markdown" v-html="compiledMarkdown"></div>
</template>

<script>
import { marked } from 'marked'
export default {
  data() {
    return {
      source: ''
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.source, { sanitize: true })
    }
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  height: 50%;
}

.markdown {
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
}
</style>
