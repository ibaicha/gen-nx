import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title!: string;
  @IsNotEmpty()
  readonly body!: string;
}
export class UpdatePostDto {
  @IsNotEmpty()
  readonly title!: string;
  @IsOptional()
  readonly body!: string;
}
