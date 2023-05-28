import { Controller } from '@nestjs/common';

@Controller('api/news-feed')
export class NewsFeedController {
  constructor(private http: HttpClient) {}
}
