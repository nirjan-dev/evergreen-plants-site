import 'dotenv/config'
import PocketBase from 'pocketbase'
import { BACKEND_URL } from '~~/shared/constants'

const email = process.env.PB_EMAIL!
const password = process.env.PB_PASSWORD!
const pbClient = new PocketBase(BACKEND_URL)
pbClient.autoCancellation(false)
await pbClient.collection('_superusers').authWithPassword(email, password, {
  autoRefreshThreshold: 30 * 60, // 30 minutes
})
export default pbClient
