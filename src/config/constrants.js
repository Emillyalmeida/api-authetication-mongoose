export const Config = {
  API_URL: "http://localhost:5000",
  MONGO_CONNECTION: process.env.URL_BD,
  options: {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
};
