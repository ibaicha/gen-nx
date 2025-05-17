import { Test, TestingModule } from '@nestjs/testing'
import { UserLocaliteController } from './user_localite.controller'
import { UserLocaliteService } from './user_localite.service'
import { PrismaService } from '../../../prisma/prisma.service'


describe('UserLocaliteController', () => {
  let controller: UserLocaliteController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLocaliteController],
      providers: [
        UserLocaliteService,
        {
          provide: PrismaService,
          useValue: {}, // 👈 mock vide (ajuste selon les méthodes appelées dans ton service)
        },
      ],
    }).compile()

    controller = module.get<UserLocaliteController>(UserLocaliteController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
