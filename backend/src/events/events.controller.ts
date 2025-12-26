import {UpdateEventDto} from "./dto/update-event.dto";
import {CreateEventDto} from "./dto/create-event.dto";
import {Controller, Get, Post, Put, Delete, Body, Param, Query} from "@nestjs/common";
import {EventsService, FindAllResult} from "./events.service";
import {ApiTags, ApiResponse, ApiBody, ApiQuery} from "@nestjs/swagger";

@ApiTags("events")
@Controller("events")
export class EventsController {
	constructor(private readonly eventsService: EventsService) {}

	@Get()
	@ApiResponse({status: 200, description: "List events with pagination and filtering"})
	@ApiQuery({name: "startDate", required: false, example: "2025-01-01", description: "Start date (YYYY-MM-DD)"})
	@ApiQuery({name: "endDate", required: false, example: "2025-12-31", description: "End date (YYYY-MM-DD)"})
	@ApiQuery({name: "type", required: false, enum: ["all", "meeting", "interview"], description: "Event type"})
	@ApiQuery({name: "company", required: false, description: "Filter by company name"})
	@ApiQuery({name: "page", required: false, example: 1, description: "Page number (default 1)"})
	@ApiQuery({name: "limit", required: false, example: 10, description: "Results per page (default 10)"})
	async findAll(
		@Query("startDate") startDate?: string,
		@Query("endDate") endDate?: string,
		@Query("type") type?: string,
		@Query("company") company?: string,
		@Query("page") page?: string,
		@Query("limit") limit?: string
	): Promise<FindAllResult> {
		return this.eventsService.findAll({
			startDate,
			endDate,
			type,
			company,
			page: page ? parseInt(page, 10) : 1,
			limit: limit ? parseInt(limit, 10) : 10,
		});
	}

	@Post()
	@ApiBody({type: CreateEventDto})
	@ApiResponse({status: 201, description: "Event created"})
	create(@Body() eventData: CreateEventDto) {
		return this.eventsService.create(eventData);
	}

	@Put(":id")
	@ApiBody({type: UpdateEventDto})
	@ApiResponse({status: 200, description: "Event updated"})
	update(@Param("id") id: string, @Body() eventData: UpdateEventDto) {
		return this.eventsService.update(id, eventData);
	}

	@Delete(":id")
	@ApiResponse({status: 200, description: "Event deleted"})
	delete(@Param("id") id: string) {
		return this.eventsService.delete(id);
	}
}
