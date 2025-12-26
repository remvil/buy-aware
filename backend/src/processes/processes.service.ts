import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {Process} from "./schemas/process.schema";
import {Event} from "../events/schemas/event.schema";
import {CreateProcessDto} from "./dto/create-process.dto";
import {UpdateProcessDto} from "./dto/update-process.dto";

@Injectable()
export class ProcessesService {
	constructor(@InjectModel(Process.name) private processModel: Model<Process>, @InjectModel(Event.name) private eventModel: Model<Event>) {}

	async create(dto: CreateProcessDto): Promise<Process> {
		const data: any = {
			...dto,
			started_at: new Date(dto.started_at),
		};
		if (dto.closed_at) data.closed_at = new Date(dto.closed_at);
		const p = new this.processModel(data);
		return p.save();
	}

	async findAll(): Promise<Process[]> {
		return this.processModel.find().sort({started_at: -1}).exec();
	}

	async findByCompany(companyName: string): Promise<Process[]> {
		return this.processModel.find({companyName}).sort({started_at: -1}).exec();
	}

	async findOne(id: string): Promise<Process> {
		const p = await this.processModel.findById(id).exec();
		if (!p) throw new NotFoundException("Process not found");
		return p;
	}

	async update(id: string, dto: UpdateProcessDto): Promise<Process> {
		const data: any = {...dto};
		if (dto.started_at) data.started_at = new Date(dto.started_at as any);
		if (dto.closed_at) data.closed_at = new Date(dto.closed_at as any);
		return this.processModel.findByIdAndUpdate(id, data, {new: true}).exec();
	}

	async remove(id: string): Promise<Process> {
		return this.processModel.findByIdAndDelete(id).exec();
	}

	async addEventToProcess(processId: string, eventId: string): Promise<Process> {
		const p = await this.processModel.findById(processId).exec();
		if (!p) throw new NotFoundException("Process not found");
		const e = await this.eventModel.findById(eventId).exec();
		if (!e) throw new NotFoundException("Event not found");
		const oid = new Types.ObjectId(eventId);
		if (!p.events) p.events = [];
		if (!p.events.find((x) => x.equals(oid))) {
			p.events.push(oid);
			await p.save();
		}
		// also set event.processId
		e.processId = p._id;
		await e.save();
		return p;
	}

	async removeEventFromProcess(processId: string, eventId: string): Promise<Process> {
		const p = await this.processModel.findById(processId).exec();
		if (!p) throw new NotFoundException("Process not found");
		const e = await this.eventModel.findById(eventId).exec();
		if (!e) throw new NotFoundException("Event not found");
		const oid = new Types.ObjectId(eventId);
		p.events = (p.events || []).filter((ev) => !ev.equals(oid));
		await p.save();
		e.processId = undefined;
		await e.save();
		return p;
	}
}
