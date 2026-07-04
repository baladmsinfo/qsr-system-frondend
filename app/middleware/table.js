import { useSessionStore } from '@/stores/session'

export default defineNuxtRouteMiddleware(() => {
  const session = useSessionStore()
  session.restore()

  if (!session.hasTable()) {
    return navigateTo('/')
  }
})
