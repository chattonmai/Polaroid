import * as path from 'path'
import * as vscode from 'vscode'
import { webviewUtils } from '@easy_vscode/core'
import { DIST_WEBVIEW_INDEX_HTML, WEBVIEW_NAMES } from '../constants'

const { getWebViewContent, handleWebviewMessage } = webviewUtils

/**
 * Custom editor that lets an image file be opened in the grid viewer via
 * "Open With… → Polaroid 🌁" (registered with `priority: "option"`, so
 * VSCode's built-in image preview stays the default).
 *
 * It is a thin shell around the existing webview: the same built HTML, the same
 * message handlers (already registered in `@easy_vscode/core`'s shared message
 * center by `registryAllWebviews`), and the same `window.commandArgs` mechanism
 * used by command-launched panels. Passing the clicked file as `commandArgs[0]`
 * makes the React app scope to the parent folder and auto-preview that image.
 */
export class ImageViewerEditorProvider implements vscode.CustomReadonlyEditorProvider {
  public static readonly viewType = 'polaroid.imageViewerEditor'

  constructor(private readonly context: vscode.ExtensionContext) {}

  public openCustomDocument(uri: vscode.Uri): vscode.CustomDocument {
    return { uri, dispose: () => undefined }
  }

  public resolveCustomEditor(
    document: vscode.CustomDocument,
    webviewPanel: vscode.WebviewPanel
  ): void {
    const fsPath = document.uri.fsPath
    const fileDir = path.dirname(fsPath)
    const workspaceFolderUris = vscode.workspace.workspaceFolders?.map((f) => f.uri) ?? []

    webviewPanel.webview.options = {
      enableScripts: true,
      // Mirror what `registryWebview` allows, plus the opened file's folder so a
      // standalone image outside the workspace still loads via `asWebviewUri`.
      localResourceRoots: [
        this.context.extensionUri,
        this.context.globalStorageUri,
        vscode.Uri.file(fileDir),
        ...workspaceFolderUris
      ]
    }

    let html = getWebViewContent(this.context, DIST_WEBVIEW_INDEX_HTML, webviewPanel.webview)
    html = html.replace('$currentView$', WEBVIEW_NAMES.PreviewImages)
    html = html.replace('$vscodeEnv$', JSON.stringify({ language: vscode.env.language }))
    html = html.replace('$commandArgs$', JSON.stringify([fsPath]))
    webviewPanel.webview.html = html

    webviewPanel.webview.onDidReceiveMessage(
      (msg) => handleWebviewMessage(msg, webviewPanel.webview),
      undefined,
      this.context.subscriptions
    )
  }
}
