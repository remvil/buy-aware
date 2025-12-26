import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.setGlobalPrefix("api");

	// Global validation for DTOs
	app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));

	// Swagger / OpenAPI setup (exposed on /api/docs)
	const config = new DocumentBuilder().setTitle("AgendaJS API").setDescription("API documentation for AgendaJS").setVersion("1.0").build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api/docs", app, document);
	// also expose raw JSON for CI or tools at /api/docs-json
	app.use("/api/docs-json", (_req, res) => res.json(document));

	await app.listen(process.env.PORT || 3001, "0.0.0.0");
	console.log(`🚀 Backend running on port ${process.env.PORT || 3001}`);
}
bootstrap();
