/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './contact.schema';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactService.create(createContactDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contact | null> {
    return this.contactService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Contact[]> {
    return this.contactService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createContactDto: CreateContactDto,
  ): Promise<Contact | null> {
    return this.contactService.update(id, createContactDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Contact | null> {
    return this.contactService.remove(id);
  }
}
