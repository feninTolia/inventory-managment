const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 400);
  });
  next();
});

server.get('/dashboard', (req, res) => {
  try {
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8')
    );
    const {
      products,
      expenses,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      // expenseByCategory,
    } = db;

    const popularProducts = products;
    // const expenseByCategorySummary = expenseByCategory;
    const expenseByCategorySummary = expenses;

    return res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Error retrieving dashboard metrics' });
  }
});

server.use(router);
const PORT = 3002;

server.listen(PORT, () => {
  console.log('server is running on - ' + PORT);
});
