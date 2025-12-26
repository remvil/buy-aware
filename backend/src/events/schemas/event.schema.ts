import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import * as mongoose from "mongoose";

@Schema({timestamps: true})
export class Event extends Document {
	@Prop({required: true})
	title: string;

	@Prop({required: true})
	date: string;

	@Prop({required: true})
	time: string;

	@Prop({required: true})
	created_at_date: string;

	@Prop({required: true})
	created_at_time: string;

	@Prop({required: true})
	updated_date: string;

	@Prop({required: true})
	updated_time: string;

	@Prop({required: true, enum: ["meeting", "interview"]})
	type: string;

	@Prop({default: ""})
	stakeholder: string;

	@Prop({default: ""})
	recruiterName: string;

	@Prop({default: ""})
	companyName: string;

	@Prop({default: ""})
	notes: string;

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: "Process", required: false})
	processId?: mongoose.Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
