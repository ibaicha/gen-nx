import { Test, TestingModule } from '@nestjs/testing'
import { UserZoneController } from './user_zone.controller'
import { UserZoneService } from './user_zone.service'
import { PrismaService } from '../../../prisma/prisma.service'

describe('UserZoneController', () => {
  let controller: UserZoneController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserZoneController],
      providers: [
        UserZoneService,
        {
          provide: PrismaService,
          useValue: {}, // 👈 mock vide (ajuste selon les méthodes appelées dans ton service)
        },
      ],
    }).compile()

    controller = module.get<UserZoneController>(UserZoneController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
