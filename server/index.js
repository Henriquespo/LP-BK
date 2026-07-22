import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '..', 'dist')
const port = process.env.PORT ?? 3000

const app = express()

app.use(express.static(distDir))

// SPA fallback: any route not matching a static file serves the landing page
app.use((_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(port, () => {
  console.log(`Buffet Kawai landing page rodando em http://localhost:${port}`)
})
