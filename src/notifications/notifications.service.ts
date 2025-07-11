import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bullmq';
import { Model, Types } from 'mongoose';
import { NotificationModel } from './notification.model';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationModel.name)
    private notificationModel: Model<NotificationModel>,
    @InjectQueue('send-notification') private notificationQueue: Queue,
  ) {}

  async sendNotification(title: string, channel: string) {
    const notification = await this.notificationModel.create({
      _id: new Types.ObjectId(),
      channel,
      title,
    });

    await this.notificationQueue.add(
      'send-notification',
      {
        notificationId: notification._id.toString(),
        channel,
      },
      {
        jobId: `notify-${notification._id.toString()}`,
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: true,
        removeOnFail: false,
      },
    );
  }

  async sendNotifToTg(notificationId: string): Promise<boolean> {
    const notification = await this.notificationModel.findOne({
      _id: new Types.ObjectId(notificationId),
    });
    if (!notification) {
      console.warn(`Notification ${notificationId} not found`);
      return false;
    }

    console.log(notification);

    try {
      const apiRes = await fetch(
        `https://api.telegram.org/bot7565070738:AAG5KkeftUdks-98qJz_NpZdQlnMxgbPiyU/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: -1002656563391,
            text: notification.title,
          }),
        },
      );

      console.log(apiRes);

      const status = apiRes.ok ? 'done' : 'failed';

      await this.notificationModel.updateOne(
        { _id: notification._id },
        { status },
      );

      return apiRes.ok;
    } catch (err) {
      console.error('Telegram API Error:', err);

      await this.notificationModel.updateOne(
        { _id: notification._id },
        { status: 'failed' },
      );

      return false;
    }
  }
}
