import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Log } from './Log.entity';

@Injectable()
export class LogService extends TypeOrmCrudService<Log> {
  constructor(@InjectRepository(Log) repo) {
    super(repo);
  }
}
