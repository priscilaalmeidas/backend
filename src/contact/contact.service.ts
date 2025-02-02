/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact') private readonly contactModel: Model<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto);
    return await createdContact.save();
  }

  async findOne(id: string): Promise<Contact | null> {
    return this.contactModel.findById(id);
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact | null> {
    return this.contactModel.findByIdAndUpdate(id, updateContactDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Contact | null> {
    return await this.contactModel.findOneAndDelete({ _id: id });
  }

  //To create lots of contacts through postman because I'm not crazy hehe
  async createMany(contacts: CreateContactDto[]): Promise<Contact[]> {
    return this.contactModel.insertMany(contacts);
  }
}
