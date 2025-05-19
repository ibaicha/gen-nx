import { Test, TestingModule } from '@nestjs/testing'
import { TypeMouvementIntrantController } from './type_mouvement_intrant.controller'
import { TypeMouvementIntrantService } from './type_mouvement_intrant.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('TypeMouvementIntrantController', () => {
  let controller: TypeMouvementIntrantController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeMouvementIntrantController],
      providers: [
        TypeMouvementIntrantService,
        {
          provide: PrismaService,
          useValue: {}, // 👈 mock vide (ajuste selon les méthodes appelées dans ton service)
        },
      ],
    }).compile()

    controller = module.get<TypeMouvementIntrantController>(
      TypeMouvementIntrantController,
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
