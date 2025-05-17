import { Test, TestingModule } from '@nestjs/testing'
import { AgenceController } from './agence.controller'
import { AgenceService } from './agence.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('AgenceController', () => {
  let controller: AgenceController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgenceController],
      providers: [
        AgenceService,
        {
          provide: PrismaService,
          useValue: {}, // 👈 mock vide (ajuste selon les méthodes appelées dans ton service)
        },
      ],
    }).compile()

    controller = module.get<AgenceController>(AgenceController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
