import {Controller, Get, Post, Body, Param, Put, Delete, Query, HttpCode, HttpStatus} from "@nestjs/common";
import {ProcessesService} from "./processes.service";
import {CreateProcessDto} from "./dto/create-process.dto";
import {UpdateProcessDto} from "./dto/update-process.dto";
import {ApiTags, ApiResponse} from "@nestjs/swagger";

@ApiTags("processes")
@Controller("processes")
export class ProcessesController {
	constructor(private readonly processesService: ProcessesService) {}

	@Post()
	@ApiResponse({status: 201, description: "Create a new process"})
	async create(@Body() dto: CreateProcessDto) {
		return this.processesService.create(dto);
	}

	@Get()
	@ApiResponse({status: 200, description: "List processes"})
	async findAll() {
		return this.processesService.findAll();
	}

	@Get("company/:companyName")
	@ApiResponse({status: 200, description: "List processes by company"})
	async findByCompany(@Param("companyName") companyName: string) {
		return this.processesService.findByCompany(companyName);
	}

	@Get(":id")
	@ApiResponse({status: 200, description: "Get a specific process"})
	async findOne(@Param("id") id: string) {
		return this.processesService.findOne(id);
	}

	@Put(":id")
	@ApiResponse({status: 200, description: "Update a process"})
	async update(@Param("id") id: string, @Body() dto: UpdateProcessDto) {
		return this.processesService.update(id, dto);
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiResponse({status: 204, description: "Delete a process"})
	async remove(@Param("id") id: string) {
		await this.processesService.remove(id);
	}

	@Post(":id/events/:eventId")
	@ApiResponse({status: 200, description: "Link an event to a process"})
	async addEvent(@Param("id") id: string, @Param("eventId") eventId: string) {
		return this.processesService.addEventToProcess(id, eventId);
	}

	@Delete(":id/events/:eventId")
	@ApiResponse({status: 200, description: "Remove an event from a process"})
	async removeEvent(@Param("id") id: string, @Param("eventId") eventId: string) {
		return this.processesService.removeEventFromProcess(id, eventId);
	}
}
