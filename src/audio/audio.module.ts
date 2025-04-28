import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AudioConsumer } from './audio.consumer';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio',
    }),
  ],
  controllers: [AudioController],
  providers: [AudioService, AudioConsumer],
})
export class AudioModule {}
