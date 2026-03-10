import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Comment Sync Plugin - Bidirectional comment persistence
 *
 * POST /api/sync-comments - Browser auto-syncs localStorage to a JSON file
 * GET  /api/sync-comments - Agents/tools read comments, browser imports on reload
 *
 * This enables the full feedback loop:
 *   Browser comments -> JSON file -> Agent reads/responds -> Browser imports replies
 */
function commentSyncPlugin() {
  const filePath = path.resolve(__dirname, 'comments-export.json')
  return {
    name: 'comment-sync',
    configureServer(server) {
      server.middlewares.use('/api/sync-comments', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              fs.writeFileSync(filePath, body, 'utf-8')
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ ok: true, file: filePath }))
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: err.message }))
            }
          })
          return
        }
        if (req.method === 'GET') {
          try {
            if (fs.existsSync(filePath)) {
              const data = fs.readFileSync(filePath, 'utf-8')
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(data)
            } else {
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end('{}')
            }
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: err.message }))
          }
          return
        }
        res.writeHead(405)
        res.end()
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), commentSyncPlugin()],
})
