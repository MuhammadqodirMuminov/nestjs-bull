import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationConsumer } from './notification.consumer';
import { NotificationModel, NotificationSchema } from './notification.model';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NotificationModel.name,
        schema: NotificationSchema,
      },
    ]),
    BullModule.registerQueue({
      name: 'send-notification',
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationConsumer],
  exports: [NotificationsService],
})
export class NotificationsModule {}
