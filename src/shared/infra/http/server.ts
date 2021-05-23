import { app } from "./app";

const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== 'production';

app.listen(PORT, () => isDevelopment && console.log(`🚀 Server listening on port: ${PORT}`));
