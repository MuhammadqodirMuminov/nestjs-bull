import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioModule } from './audio/audio.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/nest'),
    BullModule.forRoot({
      connection: {
        host: 'redis',
        port: 6379,
      },
    }),
    AudioModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
