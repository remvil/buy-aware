import {IsString, IsEnum, IsOptional, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateEventDto {
	@ApiProperty({example: "Kickoff meeting", description: "Event title"})
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({example: "2025-12-01", description: "Date in YYYY-MM-DD format"})
	@IsString()
	@IsNotEmpty()
	date: string;

	@ApiProperty({example: "14:00", description: "Time in HH:mm format"})
	@IsString()
	@IsNotEmpty()
	time: string;

	@ApiProperty({example: "2025-12-01", description: "Date in YYYY-MM-DD format when event was created"})
	@IsString()
	@IsNotEmpty()
	created_at_date: string;

	@ApiProperty({example: "10:00", description: "Time in HH:mm format when event was created"})
	@IsString()
	@IsNotEmpty()
	created_at_time: string;

	@ApiProperty({example: "2025-12-03", description: "Date in YYYY-MM-DD format"})
	@IsString()
	@IsNotEmpty()
	updated_date: string;

	@ApiProperty({example: "15:23", description: "Time in HH:mm format"})
	@IsString()
	@IsNotEmpty()
	updated_time: string;

	@ApiProperty({example: "meeting", enum: ["meeting", "interview"], description: "Type of event"})
	@IsEnum(["meeting", "interview"])
	@IsNotEmpty()
	type: string;

	@ApiProperty({example: "Luca Rossi", description: "Stakeholder / participant", required: false})
	@IsString()
	@IsOptional()
	stakeholder?: string;

	@ApiProperty({example: "Anna Bianchi", description: "Recruiter name (for interviews)", required: false})
	@IsString()
	@IsOptional()
	recruiterName?: string;

	@ApiProperty({example: "Tech Solutions Ltd.", description: "Company name (for interviews)", required: false})
	@IsString()
	@IsOptional()
	companyName?: string;

	@ApiProperty({example: "Bring portfolio", description: "Notes for the event", required: false})
	@IsString()
	@IsOptional()
	notes?: string;

	@ApiProperty({example: "64b7e4c9a6f3f2b1c0d4e5f6", description: "Optional process id to link this event to", required: false})
	@IsString()
	@IsOptional()
	processId?: string;
}
