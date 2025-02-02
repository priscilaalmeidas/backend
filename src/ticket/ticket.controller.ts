/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './ticket.schema';
import { AssignAgentDto } from './dto/assign-agent.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(createTicketDto);
  }

  @Post('batch')
  async createMany(@Body() createTicket: CreateTicketDto[]): Promise<Ticket[]> {
    return this.ticketService.createMany(createTicket);
  }

  @Get()
  async findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.findOne(id);
  }

  @Get(':agentId/agent')
  async findTicketsByAgent(@Param('agentId') id: string): Promise<Ticket[]> {
    return this.ticketService.findTicketsByAgent(id);
  }

  @Get(':agentId/agent/:status/status')
  async findTicketsByAgentAndStatus(
    @Param('agentId') agentId: string,
    @Param('status') status: string,
  ): Promise<Ticket[]> {
    return this.ticketService.findTicketsByAgentAndStatus(agentId, status);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Put(':id/assign-agent') //vincula um agente ao ticket
  async assignAgent(
    @Param('id') id: string,
    @Body() assignAgentDto: AssignAgentDto,
  ): Promise<Ticket> {
    return this.ticketService.assignAgent(id, assignAgentDto);
  }
}
