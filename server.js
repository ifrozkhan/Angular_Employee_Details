const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper function to read database
const readDatabase = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database:', err);
    return { EmployeeList: [] };
  }
};

// Helper function to write database
const writeDatabase = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Database saved successfully');
  } catch (err) {
    console.error('Error writing database:', err);
  }
};

// GET all employees
app.get('/EmployeeList', (req, res) => {
  const db = readDatabase();
  res.json(db.EmployeeList);
});

// GET employee by ID
app.get('/EmployeeList/:id', (req, res) => {
  const db = readDatabase();
  const employee = db.EmployeeList.find(e => e.id === parseInt(req.params.id));
  
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// POST - Create new employee
app.post('/EmployeeList', (req, res) => {
  const db = readDatabase();
  const newEmployee = req.body;
  
  // Generate new ID
  const maxId = db.EmployeeList.length > 0 
    ? Math.max(...db.EmployeeList.map(e => e.id)) 
    : 0;
  
  newEmployee.id = maxId + 1;
  
  db.EmployeeList.push(newEmployee);
  writeDatabase(db);
  
  res.status(201).json(newEmployee);
});

// PUT - Update employee
app.put('/EmployeeList/:id', (req, res) => {
  const db = readDatabase();
  const index = db.EmployeeList.findIndex(e => e.id === parseInt(req.params.id));
  
  if (index !== -1) {
    db.EmployeeList[index] = { ...db.EmployeeList[index], ...req.body };
    writeDatabase(db);
    res.json(db.EmployeeList[index]);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// DELETE - Delete employee
app.delete('/EmployeeList/:id', (req, res) => {
  const db = readDatabase();
  const index = db.EmployeeList.findIndex(e => e.id === parseInt(req.params.id));
  
  if (index !== -1) {
    const deletedEmployee = db.EmployeeList.splice(index, 1);
    writeDatabase(db);
    res.json(deletedEmployee[0]);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.listen(PORT, () => {
  console.log(`\n✅ Server is running on http://localhost:${PORT}`);
  console.log(`📁 Database file: ${dbPath}\n`);
});
