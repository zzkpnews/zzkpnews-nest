import * as fsp from 'fs/promises';

export async function deleteFileIfExists(filePath: string) {
  try {
    await fsp.access(filePath);
    await fsp.unlink(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return;
    }
  }
}
