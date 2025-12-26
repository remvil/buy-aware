import {Injectable, Logger} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Event} from "../../events/schemas/event.schema";
import {EventFactory} from "../factories/event.factory";

@Injectable()
export class SeederService {
	private readonly logger = new Logger(SeederService.name);

	constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

	async seed(count: number = 50): Promise<void> {
		try {
			// Clear existing events
			await this.eventModel.deleteMany({});
			this.logger.log("Cleared existing events");

			// Generate mock events
			const mockEvents = EventFactory.generateEvents(count);
			this.logger.log(`Generated ${count} mock events`);

			// Insert into database
			const inserted = await this.eventModel.insertMany(mockEvents);
			this.logger.log(`Successfully inserted ${inserted.length} events into the database`);
		} catch (error) {
			this.logger.error(`Seeding failed: ${error.message}`, error.stack);
			throw error;
		}
	}

	async seedWithCustom(count: number = 50, customEvents?: any[]): Promise<void> {
		try {
			// Clear existing events
			await this.eventModel.deleteMany({});
			this.logger.log("Cleared existing events");

			// Generate mock events
			const mockEvents = EventFactory.generateEvents(count);

			// Combine with custom events if provided
			const allEvents = [...mockEvents, ...(customEvents || [])];
			this.logger.log(`Total events to insert: ${allEvents.length}`);

			// Insert into database
			const inserted = await this.eventModel.insertMany(allEvents);
			this.logger.log(`Successfully inserted ${inserted.length} events into the database`);
		} catch (error) {
			this.logger.error(`Seeding failed: ${error.message}`, error.stack);
			throw error;
		}
	}
}
