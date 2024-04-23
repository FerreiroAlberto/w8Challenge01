import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class CryptoService {
  async hash(value: string) {
    return hash(value, 5);
  }

  async compare(value: string, hash: string) {
    return compare(value, hash);
  }
}
