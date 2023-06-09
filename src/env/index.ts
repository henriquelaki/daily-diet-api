import dotenv from 'dotenv'
import { z } from 'zod'

const path = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : '.env.development'

dotenv.config({ path })

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('⚠️ Invalid environment variables.', _env.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
