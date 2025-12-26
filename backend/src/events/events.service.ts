import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {Event} from "./schemas/event.schema";
import {CreateEventDto} from "./dto/create-event.dto";
import {UpdateEventDto} from "./dto/update-event.dto";

interface FindAllOptions {
	startDate?: string;
	endDate?: string;
	type?: string;
	company?: string;
	page?: number;
	limit?: number;
}

export interface FindAllResult {
	events: Event[];
	total: number;
	page: number;
	limit: number;
	hasMore: boolean;
}

@Injectable()
export class EventsService {
	constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

	private mapDto(dto: CreateEventDto | UpdateEventDto): any {
		const data: any = {...dto};
		if (data.processId && typeof data.processId === "string") {
			data.processId = new Types.ObjectId(data.processId);
		}

		return data;
	}

	async findAll(options: FindAllOptions = {}): Promise<FindAllResult> {
		const {startDate, endDate, type, company, page = 1, limit = 10} = options;
		const query: any = {};

		// Build filter query
		if (startDate || endDate) {
			query.date = {};
			if (startDate) query.date.$gte = startDate;
			if (endDate) query.date.$lte = endDate;
		}

		if (type && type !== "all") {
			query.type = type;
		}

		if (company && company.trim() !== "") {
			query.companyName = company;
		}

		const skip = (page - 1) * limit;
		const total = await this.eventModel.countDocuments(query);
		const events = await this.eventModel.find(query).sort({date: 1, time: 1}).skip(skip).limit(limit).exec();

		return {
			events,
			total,
			page,
			limit,
			hasMore: skip + limit < total,
		};
	}

	async create(eventData: CreateEventDto): Promise<Event> {
		const mapped = this.mapDto(eventData);

		const event = new this.eventModel(mapped);
		return event.save();
	}

	async update(id: string, eventData: UpdateEventDto): Promise<Event> {
		const mapped = this.mapDto(eventData);

		return this.eventModel.findByIdAndUpdate(id, mapped, {new: true}).exec();
	}

	async delete(id: string): Promise<Event> {
		return this.eventModel.findByIdAndDelete(id).exec();
	}
}
