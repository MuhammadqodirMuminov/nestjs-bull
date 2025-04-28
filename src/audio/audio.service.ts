import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  async addJob() {
    await this.audioQueue.add('transcode', {
      file: 'audio.mp3',
    });
  }
}
