<template>
  <div id="app">
    <ToolBar />
    <Editor />
  </div>
</template>

<script>
import ToolBar from '@/renderer/components/ToolBar.vue'
import Editor from '@/renderer/components/Editor.vue'

export default {
  components: { ToolBar, Editor }
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
