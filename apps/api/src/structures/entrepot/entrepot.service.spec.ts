import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../prisma/prisma.service'
import { EntrepotService } from './entrepot.service'

describe('PrismaService', () => {
  let service: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        EntrepotService,
        {
          provide: PrismaService,
          useValue: {}, // 👈 mock vide (ajuste selon les méthodes appelées dans ton service)
        },
      ],
    }).compile()

    service = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
