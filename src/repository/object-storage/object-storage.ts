import path from 'path';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
class ObjectStorage {
  /**
   * The directory position for object-storage
   * which contains some serialized objects.
   */
  private objectStorageDir = './data';

  constructor() {
    if (!fs.existsSync(this.objectStorageDir)) {
      fs.mkdirSync(this.objectStorageDir, { recursive: true });
    }
  }

  /**
   * Get the storage path for the object.
   * @param name The name of the object.
   * @returns The path for storage.
   */
  private generateStoragePath(name: string) {
    return path.join(this.objectStorageDir, `${name}.json`);
  }

  /**
   * To serialize an object to JSON and store it.
   * @param target The object that will be serialized. Notice: The target must be serializable object.
   * @param name The name of object.
   */
  set(target: any, name: string) {
    try {
      const serialized_data = JSON.stringify(target, null, 2);
      fs.writeFileSync(this.generateStoragePath(name), serialized_data, {
        flag: 'w',
        encoding: 'utf-8',
      });
    } catch (Error) {
      throw Error;
    }
  }

  /**
   * Load and read object from storage as an JavaScript data.
   * @param name The name of object.
   * @returns The target object or null if the object does not exist.
   */
  get<T = any>(name: string): T | null {
    if (this.exist(name)) {
      const raw_data = fs.readFileSync(this.generateStoragePath(name), {
        encoding: 'utf-8',
      });
      const result = JSON.parse(raw_data) as T;
      return result;
    }
    return null;
  }

  /**
   * To check if an object is exist.
   * @param name The name of the object.
   * @returns The object is exist or not.
   */
  exist(name: string): boolean {
    fs.access(this.generateStoragePath(name), (err) => console.log(err));
    return fs.existsSync(this.generateStoragePath(name));
  }

  /**
   * To remove the object from storage.
   * @param name The name of the object.
   */
  delete(name: string) {
    const storage_path = this.generateStoragePath(name);
    if (this.exist(name)) fs.unlinkSync(storage_path);
  }
}

/**
 * Object storage instance in global singleton mode.
 */
export { ObjectStorage };
