import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import * as mongoose from "mongoose";

@Schema({timestamps: true})
export class Process extends Document {
	@Prop({required: true})
	started_at: Date;

	@Prop({required: false})
	closed_at?: Date;

	@Prop({required: true})
	role: string;

	@Prop({type: [String], default: []})
	technologies: string[];

	@Prop({default: ""})
	notes: string;

	@Prop({default: ""})
	companyName: string;

	@Prop({type: [mongoose.Schema.Types.ObjectId], ref: "Event", default: []})
	events: mongoose.Types.ObjectId[];
}

export const ProcessSchema = SchemaFactory.createForClass(Process);
