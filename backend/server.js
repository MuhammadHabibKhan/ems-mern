const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ems_mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const attendanceSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    date: Date,
    overtime: Number,
    rptTime: String,
    lateHours: Number,
    attendance: String
});

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    fullName: String,
    cnic: Number,
    phone: Number,
    address: String,
    joinDate: Date,
    title: String,
    authority: String,
    salary: Number
});

const workerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    fullName: String,
    cnic: Number,
    phone: Number,
    address: String,
    joinDate: Date,
    overtimeRate: Number,
    skillArea: String,
    expertise: String,
    salary: Number
});

const clientSchema = new mongoose.Schema(
    {
    company: {
        type: String,
        unique: true,
        requried: true
    },
    owner: String,
    cnic: Number,
    ntn: Number,
    phone: Number,
    address: String,
    balance: Number
});

const orderSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            requried: true
        },
        date: Date,
        material: String,
        totalFT: Number,
        ratePerFT: Number,
        color: String,
        totalCost: Number,
        advance: Number
    }
)

const Attendance = mongoose.model('Attendances', attendanceSchema);
const Admin = mongoose.model('Admins', adminSchema);
const Worker = mongoose.model('Workers', workerSchema);
const Client = mongoose.model('Clients', clientSchema);
const Order = mongoose.model('Orders', orderSchema);

const secretKey = 'habib';

app.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Admin.findOne({ username });
        
        if (!user) {
            return res.status(401).send();
        }
        else if (password != user.password) {
            return res.status(401).send();
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, secretKey, { expiresIn: '21h' });
        res.status(200).send({ message: 'Login successful', token });

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

app.post('/validate-token', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
  
    if (!token) {
      return res.json({ valid: false });
    }
  
    jwt.verify(token, 'habib', (err, user) => {
      if (err) {
        return res.json({ valid: false });
      }
  
      res.json({ valid: true });
    });
  });

app.post('/NewOrder', async (req, res) => {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json(newOrder);
});

app.post('/attendanceUpdate', async (req, res) => { 
    const newAttendance = new Attendance(req.body);
    await newAttendance.save();
    res.json(newAttendance);
});

app.post('/NewAdmin', async (req, res) => {
    const newAdmin = new Admin(req.body);
    await newAdmin.save();
    res.json(newAdmin);
});

app.post('/NewWorker', async (req, res) => {
    const newWorker = new Worker(req.body);
    await newWorker.save();
    res.json(newWorker);
});

app.get('/users', async (req, res) => {
    const admin = await Admin.find();
    const worker = await Worker.find();
    const users = [...admin, ...worker];
    res.send(users);
});

app.get('/getName', async (req, res) => {
    const username = req.query.username;
    const adminResults = await Admin.findOne({username: username});
    const workerResults = await Worker.findOne({username: username});

    if (adminResults != null) {
        res.send(adminResults);
    }
    else {
        res.send(workerResults);
    }
});

app.get('/getCompany', async (req, res) => {
    const company = req.query.company;
    const companyResults = await Client.findOne({company: company});
    res.send(companyResults);
});

app.get('/getOrders', async (req, res) => {
    const company = req.query.company;
    const orderResults = await Order.find({company: company});
    console.log(orderResults);
    res.send(orderResults);
});

app.get('/getOrderDetails', async (req, res) => {
    try {
        const orderID = req.query.orderID;
        console.log(orderID);
        const orderDetails = await Order.findById(orderID);
        console.log(orderDetails);
        res.send(orderDetails);
    }
    catch (err) {
        console.log(err);
    }
});

app.get('/getAttendance', async (req, res) => {

    const username = req.query.username;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (startDate != null && endDate != null) {
        const results = await Attendance.find({
        date: {
            $gte: startDate,
            $lte: endDate
        }, username: username
    });
    res.send(results);
    }
});

app.get('/getAdmin', async (req, res) => {
    const admin = await Admin.find();
    res.send(admin);
});

app.get('/getWorker', async (req, res) => {
    const worker = await Worker.find();
    res.send(worker);
});

app.get('/getClient', async (req, res) => {
    const client = await Client.find();
    res.send(client);
});

app.post('/NewClient', async (req, res) => {
    const newClient = new Client(req.body);
    await newClient.save();
    res.json(newClient);
});

app.put('/EditAdmin', async (req, res) => {
    const username = req.query.username;
    const adminUpdate = await Admin.findOneAndUpdate(
        {username: username},
        {$set: req.body},
        {new: true, runValidators: true}
    )
    console.log(req.body);
    res.json(adminUpdate);
});

app.delete('/DeleteAdmin', async (req, res) => {
    const username = req.query.username;
    const result = await Admin.findOneAndDelete({ username: username });
    res.json(result);
});

app.put('/EditWorker', async (req, res) => {
    const username = req.query.username;
    const workerUpdate = await Worker.findOneAndUpdate(
        {username: username},
        {$set: req.body},
        {new: true, runValidators: true}
    )
    console.log(req.body);
    res.json(workerUpdate);
});

app.delete('/DeleteWorker', async (req, res) => {
    const username = req.query.username;
    const result = await Worker.findOneAndDelete({ username: username });
    res.json(result);
});

app.put('/EditClient', async (req, res) => {
    const company = req.query.company;
    const clientUpdate = await Client.findOneAndUpdate(
        {company: company},
        {$set: req.body},
        {new: true, runValidators: true}
    )
    console.log(req.body);
    res.json(clientUpdate);
});

app.delete('/DeleteClient', async (req, res) => {
    const company = req.query.company;
    const result = await Client.findOneAndDelete({ company: company });
    res.json(result);
});

app.put('/EditOrder', async (req, res) => {
    const orderID = req.query.orderID;
    const orderUpdate = await Order.findByIdAndUpdate(
        orderID,
        {$set: req.body},
        {new: true, runValidators: true}
    )
    console.log(req.body);
    res.json(orderUpdate);
});

app.delete('/DeleteOrder', async (req, res) => {
    const orderID = req.query.orderID;
    const result = await Order.findByIdAndDelete(orderID);
    res.json(result);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
