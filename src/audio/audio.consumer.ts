import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('audio')
export class AudioConsumer extends WorkerHost {
  async process(job: Job, token?: string) {
    this.logger.debug('Start transcoding...');

    for (let i = 0; i < 100; i++) {
      this.logger.log(`${JSON.stringify(job.data)} ${i}`);
      await this.sleep(5000);
    }

    this.logger.debug('Transcoding completed');
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  private readonly logger = new Logger(AudioConsumer.name);
}
