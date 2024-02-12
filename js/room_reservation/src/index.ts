import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json({ message: 'Hello Node.js!' }))

serve({
  fetch: app.fetch,
  port: 8787,
}, info => {
  console.log(`server listening ${info.address}:${info.port} ${info.family}`)
})
