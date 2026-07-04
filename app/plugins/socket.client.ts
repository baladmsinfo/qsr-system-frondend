import { io, type Socket } from 'socket.io-client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const socket: Socket = io(config.public.API_ENDPOINT, {
    transports: ['websocket', 'polling'],
  })

  return {
    provide: {
      socket,
    },
  }
})
