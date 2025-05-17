import { Test, TestingModule } from '@nestjs/testing'
import { PointAgenceService } from './point_agence.service'
import { PrismaService } from '../../prisma/prisma.service' // adapte le chemin si nécessaire

describe('PointAgenceService', () => {
  let service: PointAgenceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PointAgenceService,
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

    service = module.get<PointAgenceService>(PointAgenceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
