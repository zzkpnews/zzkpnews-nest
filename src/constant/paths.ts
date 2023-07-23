import * as path from 'path';

export const DataPath = './data';

export const ArticleContentFilePath = (articleId: string) => path.join(DataPath, `articles/${articleId}.html`);
