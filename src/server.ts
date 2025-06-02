import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
