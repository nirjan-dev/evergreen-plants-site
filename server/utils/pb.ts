/* eslint-disable ts/no-unsafe-member-access */
/* eslint-disable node/prefer-global/process */

import PocketBase from 'pocketbase'
import { BACKEND_URL } from '~~/shared/constants'
import 'dotenv/config'

/* @ts-expect-error need to fix this later */
const email = process.env.PB_EMAIL as string

/* @ts-expect-error need to fix this later */
const password = process.env.PB_PASSWORD as string

export async function getPbClient() {
  const pbClient = new PocketBase(BACKEND_URL)
  // pbClient.autoCancellation(false)
  await pbClient.collection('_superusers').authWithPassword(email, password, {
    autoRefreshThreshold: 30 * 60, // 30 minutes
  })
  return pbClient
}
