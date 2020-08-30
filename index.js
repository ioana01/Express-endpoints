const express = require('express');
const dataStore = require('nedb');

const app = express();
app.use(express.json());

const databaseContacts = new dataStore('databaseContacts.db');
databaseContacts.loadDatabase();

const databaseForms = new dataStore('databaseForms.db');
databaseForms.loadDatabase();


const contacts = [
    {
        id: 1, 
        surname: 'Surname', 
        first_name: 'First name', 
        email: 'exemplu@gmail.com', 
        phone: '1234567890',
        message: 'This is a test'
    }
];

const forms = [
    {
        // form_data : {
        //     perioada: 10,
        //     investitie_initiala: 20000,
        //     easy_invest: 500,
        //     randament: 7
        // },
        client_id: 1,
        template_id: 1
    }
]


app.post('/api/v1/contact', (req, res) => {
    // if(!req.body.surname || !req.body.first_name || !req.body.email || !req.body.message || !req.body.phone) {
    //     // 400 BAD REQUEST
    //     res.status(400).send('All fields must be completed');
    //     return;
    // }

    const contact = {
        id: contacts.length + 1,
        surname: req.body.surname,
        first_name: req.body.first_name,
        email: req.body.email,
        message: req.body.message
    };

    databaseContacts.insert(contact);
    res.send(contact);
});

app.post('/api/v1/demo/form', (req, res) => {

    const form = {
        // form_data : {
        //     perioada: req.body.form_data.perioada,
        //     investitie_initiala: req.body.form_data.investitie_initiala,
        //     easy_invest: req.body.form_data.easy_invest,
        //     randament: req.body.form_data.randament
        // },
        client_id: forms.length + 1,
        template_id: forms.length + 1
    };

    databaseForms.insert(form);
    res.send(form);
});

//environental variable
const port = process.env.PORT || 3000
app.listen(3000, () => console.log(`listening on port ${port}`));

app.use(express.static('public'));