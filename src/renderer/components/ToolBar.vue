<template>
    <div id="toolbar">
        <button @click="openFile">打开文件</button>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  methods: {
    openFile() {
      ipcRenderer.send('open-file-dialog')
    }
  }
}
</script>
