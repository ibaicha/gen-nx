import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { CreateRoleDto, UpdateRoleDto } from './role.dto'

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.role.findMany()
  }

  async getOne(roleId: number) {
    const role = await this.prismaService.role.findUnique({
      where: { id: roleId },
    })
    if (!role) throw new NotFoundException('Role not found')
    return role
  }
  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto
    await this.prismaService.role.create({ data: { name } })
    return { data: 'Role created' }
  }

  async update(roleId: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.prismaService.role.findUnique({
      where: { id: roleId },
    })
    if (!role) throw new NotFoundException('Role not found')
    await this.prismaService.role.update({
      where: { id: roleId },
      data: { ...updateRoleDto },
    })
    return { data: 'Role updeted!' }
  }

  async delete(roleId: number) {
    const role = await this.prismaService.role.findUnique({
      where: { id: roleId },
    })
    if (!role) throw new NotFoundException('Post not found')
    await this.prismaService.role.delete({ where: { id: roleId } })
    return { data: 'Role deleted' }
  }
}
