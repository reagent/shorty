import { IsUrl, Length } from 'class-validator';

export class CreateDto {
  @IsUrl()
  @Length(1, 2000)
  longUrl: string;
}
