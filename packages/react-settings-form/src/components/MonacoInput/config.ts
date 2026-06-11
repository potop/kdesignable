import { loader } from '@monaco-editor/react'
import { format } from './format'
import chromeTheme from './themes/chrome'
import monokaiTheme from './themes/monokai'

let initialized = false

// monaco >= 0.53 moved the TypeScript language service from
// monaco.languages.typescript to the top-level monaco.typescript namespace
export const getTypeScriptApi = (monaco: any) => {
  return monaco.typescript ?? monaco.languages.typescript
}

export const initMonaco = () => {
  if (initialized) return
  loader.init().then((monaco) => {
    monaco.editor.defineTheme('monokai', monokaiTheme as any)
    monaco.editor.defineTheme('chrome-devtools', chromeTheme as any)
    const typescript = getTypeScriptApi(monaco)
    typescript.typescriptDefaults.setCompilerOptions({
      target: typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: typescript.ModuleResolutionKind.NodeJs,
      module: typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
    })

    typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: true,
    })
    monaco.languages.registerDocumentFormattingEditProvider('typescript', {
      async provideDocumentFormattingEdits(model) {
        return [
          {
            text: await format(
              model['getDesignerLanguage']?.() || 'typescript',
              model.getValue()
            ),
            range: model.getFullModelRange(),
          },
        ]
      },
    })
    initialized = true
  })
}
