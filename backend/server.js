const express = require('express');
const cors = require('cors');

const surveyRoutes = require('./routes/surveys');
const questionRoutes = require('./routes/questions');
const responseRoutes = require('./routes/responses');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/surveys', surveyRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/responses', responseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
