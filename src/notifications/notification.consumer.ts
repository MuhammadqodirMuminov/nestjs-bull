import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { NotificationsService } from './notifications.service';

@Processor('send-notification')
@Injectable()
export class NotificationConsumer extends WorkerHost {
  constructor(private readonly notificationService: NotificationsService) {
    super();
  }

  async process(
    job: Job<{ notificationId: string; channel: string }>,
  ): Promise<any> {
    const { notificationId, channel } = job.data;
    console.log(job.data);

    try {
      await job.updateProgress(10); // Optional

      const result =
        await this.notificationService.sendNotifToTg(notificationId);

      if (result) {
        console.log(
          `✅ [Job ${job.id}] Sent notification ${notificationId} via ${channel}`,
        );
        await job.updateProgress(100); // Optional
        return { status: 'sent', id: notificationId };
      } else {
        console.warn(
          `⚠️ [Job ${job.id}] Notification ${notificationId} failed via ${channel}`,
        );
        return { status: 'failed', id: notificationId };
      }
    } catch (error) {
      console.error(
        `❌ [Job ${job.id}] Notification failed: ${notificationId}`,
        error,
      );
      throw error; // Let BullMQ handle retry logic
    }
  }
}
