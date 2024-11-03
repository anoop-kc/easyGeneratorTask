import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @ApiProperty({ example: 'Some name', description: 'The name of the user' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'somename@example.com',
    description: 'The email of the user',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'The hashed password of the user' })
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
