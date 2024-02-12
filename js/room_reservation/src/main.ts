import {fastify} from "./constants/injection.js";

main()

async function main () {
  fastify.route({
    method: 'get',
    url: '/',
    handler: async () => {
      return 'hello fastify'
    }
  })

  fastify.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}
