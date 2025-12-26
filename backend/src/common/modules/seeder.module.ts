import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Event, EventSchema} from "../../events/schemas/event.schema";
import {SeederService} from "../services/seeder.service";

@Module({
	imports: [MongooseModule.forFeature([{name: Event.name, schema: EventSchema}])],
	providers: [SeederService],
	exports: [SeederService],
})
export class SeederModule {}
