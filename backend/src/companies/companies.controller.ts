import {Controller, Get} from "@nestjs/common";
import {CompaniesService} from "./companies.service";
import {ApiTags, ApiResponse} from "@nestjs/swagger";

@ApiTags("companies")
@Controller("companies")
export class CompaniesController {
	constructor(private readonly companiesService: CompaniesService) {}

	@Get("distinct")
	@ApiResponse({status: 200, description: "List of all distinct company names"})
	async getDistinctCompanies(): Promise<string[]> {
		return this.companiesService.getDistinctCompanies();
	}
}
