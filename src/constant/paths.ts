import * as path from 'path';

export const DataPath = './data';
export const LogPath = './log';

export const ArticleContentFilePath = (articleId: string) => path.join(DataPath, `articles/${articleId}.html`);
