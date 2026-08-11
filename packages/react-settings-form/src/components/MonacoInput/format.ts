import { parse } from '@babel/parser'

// Prettier is only needed for the plain javascript/typescript editors (the
// ReactionsSetter `fulfill.run` one). The `*.expression` and `json` branches below
// never touch it, so it is loaded lazily — the consumer's bundler code-splits it into
// its own chunk. It must come from the declared `prettier` dependency and not a CDN:
// loading it over the network breaks any host with a `script-src 'self'` CSP, and the
// rejected promise used to be cached here, silently killing formatting for the rest of
// the session. `prettier/standalone` is the browser-safe build (no `fs`).
let prettier: Promise<typeof import('prettier/standalone')> = null

export const format = async (language: string, source: string) => {
  if (
    language === 'javascript.expression' ||
    language === 'typescript.expression'
  ) {
    return source
  }
  if (language === 'json') {
    return JSON.stringify(JSON.parse(source), null, 2)
  }
  if (/(?:javascript|typescript)/gi.test(language)) {
    prettier = prettier || import('prettier/standalone')
    const { format: formatSource } = await prettier
    return formatSource(source, {
      semi: false,
      parser(text) {
        return parse(text, {
          sourceType: 'module',
          plugins: ['typescript', 'jsx'],
        })
      },
    })
  }
  return source
}
