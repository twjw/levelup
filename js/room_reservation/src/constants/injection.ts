import Fastify from "fastify";
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";

export const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    }
  }
}).withTypeProvider<TypeBoxTypeProvider>()
