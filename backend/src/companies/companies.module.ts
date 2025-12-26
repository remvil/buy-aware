import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {CompaniesController} from "./companies.controller";
import {CompaniesService} from "./companies.service";
import {Event, EventSchema} from "../events/schemas/event.schema";

@Module({
	imports: [MongooseModule.forFeature([{name: Event.name, schema: EventSchema}])],
	controllers: [CompaniesController],
	providers: [CompaniesService],
})
export class CompaniesModule {}
