import {faker} from "@faker-js/faker";

export interface MockEventData {
	title: string;
	date: string;
	time: string;
	updated_date: string;
	updated_time: string;
	type: "meeting" | "interview";
	stakeholder: string;
	recruiterName: string;
	companyName: string;
	notes: string;
}

export class EventFactory {
	static generateEvent(overrides?: Partial<MockEventData>): MockEventData {
		const type = faker.datatype.boolean() ? "meeting" : "interview";

		return {
			title: type === "meeting" ? faker.hacker.phrase() : `Interview - ${faker.company.name()}`,
			date: faker.date.future({years: 1}).toISOString().split("T")[0],
			time: faker.date.future({years: 1}).toLocaleTimeString("it-IT", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			}),
			updated_date: faker.date.future({years: 1}).toISOString().split("T")[0],
			updated_time: faker.date.future({years: 1}).toLocaleTimeString("it-IT", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			}),
			type,
			stakeholder: type === "meeting" ? faker.person.fullName() : "",
			recruiterName: type === "interview" ? faker.person.fullName() : "",
			companyName: type === "interview" ? faker.company.name() : "",
			notes: faker.lorem.sentence(),
			...overrides,
		};
	}

	static generateEvents(count: number, overrides?: Partial<MockEventData>): MockEventData[] {
		return Array.from({length: count}, () => this.generateEvent(overrides));
	}
}
