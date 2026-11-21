import { getPayload, Payload } from 'payload'
import config from '@payload-config'

let cachedPayloadPromise: Promise<Payload> | null = null

export const getPayloadClient = async (): Promise<Payload> => {
  const dbUri = process.env.DATABASE_URL || process.env.DATABASE_URI
  if (!dbUri) {
    throw new Error('DATABASE_URL or DATABASE_URI environment variable is not configured')
  }

  if (!cachedPayloadPromise) {
    cachedPayloadPromise = getPayload({ config })
  }

  try {
    return await cachedPayloadPromise
  } catch (error) {
    cachedPayloadPromise = null
    throw error
  }
}
