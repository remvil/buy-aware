import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ProcessesController} from "./processes.controller";
import {ProcessesService} from "./processes.service";
import {Process, ProcessSchema} from "./schemas/process.schema";
import {Event, EventSchema} from "../events/schemas/event.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: Process.name, schema: ProcessSchema},
			{name: Event.name, schema: EventSchema},
		]),
	],
	controllers: [ProcessesController],
	providers: [ProcessesService],
})
export class ProcessesModule {}
