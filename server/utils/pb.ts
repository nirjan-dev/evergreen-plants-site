import 'dotenv/config'
import PocketBase from 'pocketbase'
import { BACKEND_URL } from '~~/shared/constants'

const token = process.env.PB_TOKEN!
const pbClient = new PocketBase(BACKEND_URL)
pbClient.autoCancellation(false)
pbClient.authStore.save(token)

export default pbClient
