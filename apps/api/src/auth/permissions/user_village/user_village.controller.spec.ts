import { Test, TestingModule } from '@nestjs/testing'
import { UserVillageController } from './user_village.controller'
import { UserVillageService } from './user_village.service'
import { PrismaService } from '../../../prisma/prisma.service'

describe('UserVillageController', () => {
  let controller: UserVillageController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVillageController],
      providers: [
        UserVillageService,
        {
          provide: PrismaService,
          useValue: {}, // 👈 mock vide (ajuste selon les méthodes appelées dans ton service)
        },
      ],
    }).compile()

    controller = module.get<UserVillageController>(UserVillageController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
