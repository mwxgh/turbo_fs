import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient(
  process.env.DATABASE_LOG === '1'
    ? {
        log: [
          {
            emit: 'event',
            level: 'query',
          },
        ],
      }
    : {},
)

export default prisma
