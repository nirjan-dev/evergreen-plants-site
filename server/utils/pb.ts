import PocketBase from 'pocketbase'

const token = ''
const pbClient = new PocketBase('https://evergreen-plants-backend.fly.dev')
pbClient.autoCancellation(false)
pbClient.authStore.save(token)

export default pbClient
