import { Injectable } from '@nestjs/common';
import { NotificationsService } from './notifications/notifications.service';

@Injectable()
export class AppService {
  constructor(private readonly notificationService: NotificationsService) {}
  async getHello() {
    return 'Hello World!';
  }

  async quizResult() {
    await this.notificationService.sendNotification(
      'quiz result send notification',
      'PUSH',
    );
    return {
      success: true,
    };
  }

  async examResult() {
    await this.notificationService.sendNotification(
      'exam result send notification',
      'PUSH',
    );
    return {
      success: true,
    };
  }

  async poolResult() {
    await this.notificationService.sendNotification(
      'pool result send notification',
      'PUSH',
    );
    return {
      success: true,
    };
  }
}
