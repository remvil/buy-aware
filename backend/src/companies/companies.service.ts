import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Event} from "../events/schemas/event.schema";

@Injectable()
export class CompaniesService {
	constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

	async getDistinctCompanies(): Promise<string[]> {
		const companies = await this.eventModel.distinct("companyName").exec();
		return companies.filter((company) => company && company.trim() !== "").sort();
	}
}
