'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import * as fs from 'fs'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('ficus::create-window', (event) => {
  createWindow()
})

async function getFileFromUser (browserWindow) {
  // files is an array of file path.
  const files = dialog.showOpenDialog(BrowserWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] }
    ]
  })
  if (!files) {
    return null
  }

  const file = files[0]
  const content = fs.readFileSync(file).toString()

  console.log(content)
  return file
}

async function saveMarkdown (browserWindow, filePath, content) {
  const files = dialog.showOpenDialog(BrowserWindow, {
    properties: ['openFile']
  })
  if (!files) {
    return false
  }

  const file = files[0]
  fs.writeFileSync(file, content)
  return true
}

// 打开 markdown 文件
ipcMain.on('ficus::open-file', async (event) => {
  try {
    const file = await getFileFromUser(
      BrowserWindow.fromWebContents(event.sender)
    )
    if (file) {
      event.reply('file-opened', file.path, file.content)
    }
  } catch (e) {
    console.error(e)
  }
})

// 读取 markdown 文件
// note 必须包含有效的 filePath
ipcMain.on('read-file', async (event, note) => {
  try {
    const file = await getFileFromUser(
      BrowserWindow.fromWebContents(event.sender),
      note.filePath
    )
    event.reply('file-read', note.id, file && file.content)
  } catch (e) {
    console.error(e)
  }
})

// 保存 markdown 文件
ipcMain.on('save-markdown', async (event, note) => {
  try {
    const filePath = await saveMarkdown(
      BrowserWindow.fromWebContents(event.sender),
      note.filePath,
      note.content
    )

    if (filePath) {
      event.reply('file-saved', note.id, filePath)
    }
  } catch (e) {
    console.error(e)
  }
})
