import { app } from './app';

const PORT = process.env.PORT || 3333;
const isDevelopment = process.env.NODE_ENV !== 'production';

app.listen(
  PORT,
  // eslint-disable-next-line no-console
  () => isDevelopment && console.log(`🚀 Server listening on port: ${PORT}`),
);
