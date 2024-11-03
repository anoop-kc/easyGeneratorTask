import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from './user.schema';
import { logger } from 'src/logger';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const { name, email, password } = userData;
      logger.info(`Creating a new user with email  ${email}`);

      // Create and save the user
      const user = new this.userModel({
        name,
        email,
        password,
      });

      const savedUser = await user.save();
      savedUser.password = 'string';

      logger.info(
        `User created successfully with email ${email} and ID: ${savedUser._id}`,
      );
      return savedUser;
    } catch (error) {
      logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      logger.info(`Finding the user with email ${email}`);

      return this.userModel.findOne({ email }).exec();
    } catch (error) {
      logger.error(`Failed to find the user: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to find user');
    }
  }

  async findById(id: string): Promise<User> {
    try {
      logger.info(`Finding the user with id ${id}`);

      return this.userModel.findOne({ _id: id }).exec();
    } catch (error) {
      logger.error(`Failed to find the user: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to find user');
    }
  }
}
