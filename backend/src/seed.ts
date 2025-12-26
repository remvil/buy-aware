import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {SeederService} from "./common/services/seeder.service";

async function seed() {
	const app = await NestFactory.createApplicationContext(AppModule);
	const seederService = app.get(SeederService);

	const count = parseInt(process.argv[2] || "50", 10);

	try {
		await seederService.seed(count);
		console.log(`✅ Database seeded successfully with ${count} mock events!`);
		process.exit(0);
	} catch (error) {
		console.error("❌ Seeding failed:", error);
		process.exit(1);
	}
}

seed();
