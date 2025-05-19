import { Test, TestingModule } from '@nestjs/testing'
import { PointAgenceController } from './point_agence.controller'
import { PointAgenceService } from './point_agence.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('PointAgenceController', () => {
  let controller: PointAgenceController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointAgenceController],
      providers: [
        PointAgenceService,
        {
          provide: PrismaService,
          useValue: {}, // 👈 mock vide (ajuste selon les méthodes appelées dans ton service)
        },
      ],
    }).compile()

    controller = module.get<PointAgenceController>(PointAgenceController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
