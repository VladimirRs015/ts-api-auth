export default {
PORT:process.env.PORT ||  4000,
MONGO_DB: process.env.MONGO_DB|| "mongodb://localhost/app_auth",
MONGO_USER: process.env.MONGO_PASSWORD || "admin",
MONGO_PASSWORD:process.env.MONGO_PASSWORD || "admin",
SECRET:process.env.SECRET||"something_secret",
API_VERSION :'/api/v1'
}

