export default () => ({
	port: Number.parseInt(process.env.PORT, 10) || 80,
	postgres: {
		host: process.env.POSTGRES_HOST || "127.0.0.1",
		port: Number.parseInt(process.env.POSTGRES_PORT, 10) || 5432,
		username: process.env.POSTGRES_USERNAME || "root",
		password: process.env.POSTGRES_PASSWORD || "toor",
		database: process.env.POSTGRES_DATABASE || "coffee-e-shop",
	},
	aws: {
		region: process.env.AWS_REGION || "us-east-1",
		accessKey: process.env.AWS_ACCESS_KEY,
		secretKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
	s3: {
		imagesBucketName: process.env.IMAGES_BUCKET_NAME || "coffee-e-shop-images",
	},
});
