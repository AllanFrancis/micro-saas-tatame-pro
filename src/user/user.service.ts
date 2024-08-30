import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (user) {
      throw new ConflictException('Já existe uma conta com este e-mail');
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        email: dto.email.toLowerCase(),
        password: await hash(dto.password, 6),
      },
    });

    const { password, ...result } = newUser;

    return result;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new ConflictException('Usuário não encontrado');
    }
    const { password, ...result } = user;

    return result;
  }
}
