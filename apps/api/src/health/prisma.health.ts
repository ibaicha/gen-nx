// src/health/prisma.health.ts
import { Injectable } from '@nestjs/common'
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.prisma.$queryRaw`SELECT 1`
      return this.getStatus(key, true)
    } catch (e) {
      throw new HealthCheckError('Prisma check failed', e)
    }
  }
}
