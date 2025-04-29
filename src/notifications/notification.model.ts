import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class NotificationModel {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['done', 'failed', 'pending'],
    default: 'pending',
  })
  status: string;

  @Prop({ enum: ['EMAIL', 'SMS', 'PUSH', 'IN_APP'], default: 'IN_APP' })
  channel: string;

  @Prop()
  title: string;

  @Prop({ type: Number, default: 0 })
  retry: number;
}

export const NotificationSchema =
  SchemaFactory.createForClass(NotificationModel);
