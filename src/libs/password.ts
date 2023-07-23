import { v4 } from 'uuid';
import { SHA3 } from 'crypto-js';

/**
 * Check the password format:
 * The length is not less than 5 characters.
 * And contains both uppercase and lowercase English letters and numbers
 * @param password
 * @returns
 */
export function checkPasswordFormat(password: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/.test(password);
}

/**
 * Generate the specified hash for a password.
 * And at the same time provide the corresponding salt value.
 * @param password
 * @returns
 */
export function getPasswordHash(password: string): {
  hash: string;
  salt: string;
} {
  const salt: string = v4();
  const hash = _generatePasswordHash(password, salt);
  return { hash, salt };
}

/**
 * Check password validity.
 * Check whether the hash value of the password is the same as the specified target hash value.
 * @param password
 * @param salt
 * @param targetHash
 * @returns
 */
export function verifyPasswordHash(password: string, salt: string, targetHash: string): boolean {
  const current_hash = _generatePasswordHash(password, salt);
  return current_hash === targetHash;
}

/**
 * Generate password hashes according to certain rules and salt.
 * @param password
 * @param salt
 * @returns
 */
function _generatePasswordHash(password: string, salt: string) {
  return SHA3(
    password
      .split('')
      .sort()
      .join('')
      .concat(SHA3(password.concat(salt)).toString())
      .toString(),
  ).toString();
}
