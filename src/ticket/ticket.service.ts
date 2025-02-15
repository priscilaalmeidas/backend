/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ticket, TicketDocument } from './ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AssignAgentDto } from './dto/assign-agent.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const createdTicket = new this.ticketModel(createTicketDto);
    return createdTicket.save();
  }

  async createMany(createTicket: CreateTicketDto[]): Promise<Ticket[]> {
    const tickets = await this.ticketModel.insertMany(createTicket);
    return tickets.map((ticket) => ticket.toObject() as Ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().populate('contact', 'name').exec();
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel
      .findById(id)
      .populate('contact', 'name')
      .exec();
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  async findTicketsByAgent(agentId: string): Promise<Ticket[]> {
    return this.ticketModel.find({ agent: agentId }).exec();
  }

  async findTicketsByAgentAndStatus(
    agentId: string,
    status: string,
  ): Promise<Ticket[]> {
    return this.ticketModel.find({ agent: agentId, status }).exec();
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const updatedTicket = await this.ticketModel.findByIdAndUpdate(
      id,
      updateTicketDto,
      {
        new: true,
      },
    );
    if (!updatedTicket) {
      throw new NotFoundException('Ticket not found');
    }
    return updatedTicket;
  }

  async assignAgent(
    ticketId: string,
    assignAgentDto: AssignAgentDto,
  ): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(ticketId);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    ticket.agent = new Types.ObjectId(assignAgentDto.agent);
    return ticket.save();
  }
}
