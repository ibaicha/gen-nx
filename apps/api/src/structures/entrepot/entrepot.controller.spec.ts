import { Test, TestingModule } from '@nestjs/testing'
import { EntrepotController } from './entrepot.controller'
import { EntrepotService } from './entrepot.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('EntrepotController', () => {
  let controller: EntrepotController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntrepotController],
      providers: [
        EntrepotService,
        {
          provide: PrismaService,
          useValue: {}, // 👈 mock vide (ajuste selon les méthodes appelées dans ton service)
        },
      ],
    }).compile()

    controller = module.get<EntrepotController>(EntrepotController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
