// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, HealthCheck } from '@nestjs/terminus'
import { PrismaHealthIndicator } from './prisma.health'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.prismaHealth.pingCheck('database')])
  }
}
