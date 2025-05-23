import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'

//import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs'

import * as speakease from 'speakeasy'

import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { PrismaService } from '../prisma/prisma.service'
import { MailerService } from '../mailer/mailer.service'
import {
  DeleteAccountdto,
  ResetPasswordConfirmationDto,
  ResetPasswordDemandDto,
  signinDto,
  signupDto,
} from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly primaService: PrismaService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getAll() {
    return this.primaService.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            address: true,
          },
        },
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        UserZone: {
          select: {
            zone: {
              select: {
                id: true,
                name: true,
                pays: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        UserSousZone: {
          select: {
            sousZone: {
              select: {
                id: true,
                name: true,
                zone: {
                  select: {
                    id: true,
                    name: true,
                    pays: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        UserLocalite: {
          select: {
            localite: {
              select: {
                id: true,
                name: true,
                sousZone: {
                  select: {
                    id: true,
                    name: true,
                    zone: {
                      select: {
                        id: true,
                        name: true,
                        pays: {
                          select: {
                            id: true,
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        UserPoint: {
          select: {
            point: {
              select: {
                id: true,
                name: true,
                localite: {
                  select: {
                    id: true,
                    name: true,
                    sousZone: {
                      select: {
                        id: true,
                        name: true,
                        zone: {
                          select: {
                            id: true,
                            name: true,
                            pays: {
                              select: {
                                id: true,
                                name: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        UserOp: {
          select: {
            op: {
              select: {
                id: true,
                name: true,
                point: {
                  select: {
                    id: true,
                    name: true,
                    localite: {
                      select: {
                        id: true,
                        name: true,
                        sousZone: {
                          select: {
                            id: true,
                            name: true,
                            zone: {
                              select: {
                                id: true,
                                name: true,
                                pays: {
                                  select: {
                                    id: true,
                                    name: true,
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        UserAgence: {
          select: {
            agence: {
              select: {
                id: true,
                name: true,
                societe: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        UserSociete: {
          select: {
            societe: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })
  }
  async signup(signupDto: signupDto) {
    const { email, password, username, roleId } = signupDto
    // ** Verifier si l'utilisateur est deja inscrit
    const user = await this.primaService.user.findUnique({ where: { email } })
    if (user) throw new ConflictException('User already exists')
    // ** Hasher le mot de passe
    const hash = await bcrypt.hash(password, 10)
    // ** Enregistrer l'utilisateur dans la BD
    await this.primaService.user.create({
      data: {
        email,
        username,
        password: hash,
        roleId,
      },
    })
    // ** Envoyer un mail de confirmation
    await this.mailerService.sendSignupConfirmation(email)
    // ** Retourner une reponse de succés

    return { data: 'User successfully created' }
  }

  async signin(signinDto: signinDto) {
    const { email, password } = signinDto
    // ** Vérifier si le user est deja inscrit
    const user = await this.primaService.user.findUnique({
      where: { email },
      /*
            include: {
                role: true,
                profile: true,
                userZones: {
                    select: {
                        zone: {
                            select: {
                                id: true,
                                name: true,
                                pays: {
                                    select: {
                                        id: true,
                                        name: true,
                                    }
                                }
                            }
                        },
                    }

                },
                userSousZones: {
                    select: {
                        sousZone: {
                            select: {
                                id: true,
                                name: true,

                            }
                        },
                    }
                },
                userLocalites: {
                    select: {
                        localite: {
                            select: {
                                id: true,
                                name: true,
                                sousZone: {
                                    select: {
                                        id: true,
                                        name: true,
                                        zones: {
                                            select: {
                                                id: true,
                                                name: true,
                                                pays: {
                                                    select: {
                                                        id: true,
                                                        name: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }


                            }
                        },
                    }
                },
                userVillages: {
                    select: {
                        village: {
                            select: {
                                id: true,
                                name: true,
                                localite: {
                                    select: {
                                        id: true,
                                        name: true,
                                        sousZone: {
                                            select: {
                                                id: true,
                                                name: true,
                                                zones: {
                                                    select: {
                                                        id: true,
                                                        name: true,
                                                        pays: {
                                                            select: {
                                                                id: true,
                                                                name: true
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    }
                },




                }
                */
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            address: true,
          },
        },
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        UserZone: {
          select: {
            zone: {
              select: {
                id: true,
                name: true,
                pays: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        UserSousZone: {
          select: {
            sousZone: {
              select: {
                id: true,
                name: true,
                zone: {
                  select: {
                    id: true,
                    name: true,
                    pays: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        UserLocalite: {
          select: {
            localite: {
              select: {
                id: true,
                name: true,
                sousZone: {
                  select: {
                    id: true,
                    name: true,
                    zone: {
                      select: {
                        id: true,
                        name: true,
                        pays: {
                          select: {
                            id: true,
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        UserPoint: {
          select: {
            point: {
              select: {
                id: true,
                name: true,
                localite: {
                  select: {
                    id: true,
                    name: true,
                    sousZone: {
                      select: {
                        id: true,
                        name: true,
                        zone: {
                          select: {
                            id: true,
                            name: true,
                            pays: {
                              select: {
                                id: true,
                                name: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        UserOp: {
          select: {
            op: {
              include: {
                localite: {
                  include: {
                    sousZone: {
                      include: {
                        zone: {
                          include: {
                            pays: true,
                          },
                        },
                      },
                    },
                  },
                },
                formeJuridique: {
                  include: {},
                },
              },
            },
          },
        },
        UserAgence: {
          select: {
            agence: {
              select: {
                id: true,
                name: true,
                societe: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        UserSociete: {
          select: {
            societe: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!user) throw new NotFoundException('User does not exist')
    // ** Comparer le mot de passe
    const match = await bcrypt.compare(password, user.password)
    if (!match)
      throw new UnauthorizedException('Password does not match password')
    // ** Retourner un tooken jwt

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    }

    const token = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: this.configService.get('SECRET_KEY'),
    })

    return {
      token,

      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile,
        userZones: user.UserZone,
        userSousZones: user.UserSousZone,
        userLocalites: user.UserLocalite,
        userPoints: user.UserPoint,
        userOps: user.UserOp,
        userAgences: user.UserAgence,
        userSocietes: user.UserSociete,
      },
    }
  }

  async resetPasswordDemandDto(resetPasswordDemandDto: ResetPasswordDemandDto) {
    const { email } = resetPasswordDemandDto
    const user = await this.primaService.user.findUnique({ where: { email } })
    if (!user) throw new NotFoundException('User does not exist')
    const code = speakease.totp({
      secret: this.configService.get('OTP_CODE')!,
      digits: 5,
      step: 60 * 15,
      encoding: 'base32',
    })

    const url = 'http://localhost:3000/auth/reset-password/'
    await this.mailerService.sendResetPassword(email, url, code)
    return {
      data: 'Reset password mail has been sent',
    }
  }

  async resetPasswordConfirmationDto(
    resetPasswordConfirmationDto: ResetPasswordConfirmationDto,
  ) {
    const { code, email, password } = resetPasswordConfirmationDto
    const user = await this.primaService.user.findUnique({ where: { email } })
    if (!user) throw new NotFoundException('User not found')
    const match = speakease.totp.verify({
      secret: this.configService.get('OTP_CODE')!,
      token: code,
      digits: 5,
      step: 60 * 15,
      encoding: 'base32',
    })
    if (!match) throw new UnauthorizedException('Invalid/expired token')
    const hash = await bcrypt.hash(password, 10)
    await this.primaService.user.update({
      where: { email },
      data: { password: hash },
    })
    return {
      data: 'Password updated',
    }
  }

  async deleteAccount(userId: number, deleteAccountDto: DeleteAccountdto) {
    const { password } = deleteAccountDto
    const user = await this.primaService.user.findUnique({
      where: { id: userId },
    })
    if (!user) throw new NotFoundException('User not found')
    // ** Comparer le mot de passe
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new UnauthorizedException('Password does not match')
    await this.primaService.user.delete({ where: { id: userId } })
    return { data: 'User successfully deleted' }
  }
}
