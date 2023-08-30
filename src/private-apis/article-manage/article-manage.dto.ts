import { IsString } from 'class-validator';

export class SubmitArticleDTO {
  @IsString()
  title: string;
  @IsString()
  subtitle: string | null;
  @IsString()
  leadTitle: string | null;
  @IsString()
  citation: string | null;
  @IsString()
  coverImage: string | null;
  @IsString()
  keywords: string | null;
  @IsString()
  belongingSectionId: string;
  @IsString()
  belongingTopicId: string | null;
  @IsString()
  author: string | null;
  @IsString()
  editor: string | null;
  @IsString()
  origin: string | null;
  @IsString()
  originUrl: string | null;
  @IsString()
  content: string;
}
