import { Test, TestingModule } from '@nestjs/testing'
import { AgenceService } from './agence.service'
import { PrismaService } from '../../prisma/prisma.service' // adapte le chemin si nécessaire

describe('AgenceService', () => {
  let service: AgenceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgenceService,
        {
          provide: PrismaService,
          useValue: {
            agence: {
              findMany: jest.fn().mockResolvedValue([]),
              // ajoute ici d'autres méthodes si utilisées dans ton service
            },
          },
        },
      ],
    }).compile()

    service = module.get<AgenceService>(AgenceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
