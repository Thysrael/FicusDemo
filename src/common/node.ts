import { mark2html } from "@/markdown/mark"

class Note {
    readonly id: string // ID
    readonly created: number // 创建时间的时间戳

    title: string // 标题
    content: string // 内容（Markdown格式）
    originalContent: string | null // 笔记的原始内容，null 表示文件内容还未读取
    textChanged: boolean = false // Markdown 内容是否修改过
    filePath: string | null = null // 文件路径

    constructor(...para: any[]) {
        // TODO
    }

    /**
   * 笔记的 HTML 文本
   * @public
   * @type {string}
   */
    public get preview() {
        return mark2html(this.content) // 这里mark2html为接口
    }
}