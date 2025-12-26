import {IsString, IsOptional, IsArray, IsNotEmpty, IsISO8601} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateProcessDto {
	@ApiProperty({example: "2025-12-01", description: "Process start date (ISO8601)"})
	@IsISO8601()
	@IsNotEmpty()
	started_at: string;

	@ApiProperty({example: "2025-12-15", description: "Process closed date (ISO8601)", required: false})
	@IsISO8601()
	@IsOptional()
	closed_at?: string;

	@ApiProperty({example: "Frontend Engineer", description: "Role for which this process is running"})
	@IsString()
	@IsNotEmpty()
	role: string;

	@ApiProperty({example: ["React", "TypeScript"], description: "Technologies involved", required: false})
	@IsArray()
	@IsOptional()
	technologies?: string[];

	@ApiProperty({example: "Notes in markdown", description: "Notes for the process", required: false})
	@IsString()
	@IsOptional()
	notes?: string;

	@ApiProperty({example: "Tech Solutions Ltd.", description: "Company name for this process", required: false})
	@IsString()
	@IsOptional()
	companyName?: string;
}
