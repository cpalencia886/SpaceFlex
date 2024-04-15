const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const Accounts = require('./data').AccountsDB;
const Employes = require('./data').EmployesDB;

const regterColroler = require('./register');
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './SpaceFlex')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./SpaceFlex/register.html'));
});
//Auth
const authUser = (req, res, next) => {
    try {
        const token = req.headers.authoriztion.split(' ')[1];
        const decodToken = jwt.verify(token, 'TokKey')

        req.Account = decodToken.tok;
        next()
    }
    catch(error) {
        console.error("no let in");
        res.status(401).json({error: 'Unauthorized'});
    }
}

//New Accounts

app.post('/makeanew', async (req, res) => {
    try {
        let x = regterColroler.MakeANewAccount()
        let See = Accounts.find((data) => req.x.newaccount === Account.email);
        if(!See)
        {
            if(!req.body.newID)
            {
                authUser();
                const hashedPassword = await bcrypt.hash(req.x.newpasssword, 10);
                const Account = {
                    username: req.x.newaccount,
                    email: req.x.newemail,
                    password: hashedPassword,
                    tok: null
                };
                    Accounts.push(Account);
                    res.send(window.location.replace("conmaked.html"))
            }
            else {
                let y = regterColroler.newworker()
                authUser();
                if(req.y.stat == 1) {
                    const hashedPassword = await bcrypt.hash(req.y.newpasssword, 10);
                    const Account = {
                        username: req.y.newaccount,
                        email: req.y.newemail,
                        password: hashedPassword,
                        tok: null,
                        ID: req.y.newID,
                        stat: "Owner"
                };
                Employes.push(Account);
                res.send(window.location.replace("owner.html"))   
                }   

                else {
                    const hashedPassword = await bcrypt.hash(req.body.newpasssword, 10);
                const Account = {
                    username: req.y.newaccount,
                    email: req.y.newemail,
                    password: hashedPassword,
                    tok: null,
                    ID: req.y.newID,
                    stat: "Employe"
                };
                    Employes.push(Account);
                    res.send(window.location.replace("conmaked.html"))    
            }
            } 
        }
        else {
            res.send(1);
        }
    }
    catch {
        res.status(500).send()
    }
});



//Login
app.post('/register', async (req, res) => {
    try {
        regterColroler.Login(req, res)
        let find = Accounts.find((data) => req.body.AccUserName === data.email || req.body.AccUserName === data.username)
        if(find)
        {
                let submittedPass = req.body.AccPassword;
                let AccountPass = find.password;
                const x = await bcrypt.compare(submittedPass, AccountPass);
                if(x) {
                    res.send(window.location.replace("comfirm.html"))
                    }
                else {
                    res.send(1)
                }   
        }

        else {
            let worker = Employes.find((data) => req.body.AccUserName === data.email || req.body.AccUserName === data.username)

        if(worker)
        {
            let role =worker.find((data) => data.stat);
            let submittedPass = req.body.AccPassword;
            let AccountPass = role.password;
            const x = await bcrypt.compare(submittedPass, AccountPass);
        }
        if(x && role == "Employe")
        {
            res.location('confirm.html') 
        }
        else if (x && role == "Owner") {
            res.location('http://owner.html')
        }
        else {
            res.send(1)
        }
        }
        
    }
    catch {
        res.status(500).send()
    }

});



app.post('/work', async (req, res) =>{
    let worker = Employes.find((data) => req.body.AccUserName === data.email || req.body.AccUserName === data.username)

    if(worker)
    {
    let role =worker.find((data) => data.stat);
    let submittedPass = req.body.AccPassword;
    let AccountPass = role.password;
    const x = await bcrypt.compare(submittedPass, AccountPass);

        if(x && role == "Employe")
        {
            res.location('confirm.html') 
        }
        else if (x && role == "Owner") {
            res.location('http://owner.html')
        }
        else {
            res.send(1)
          }
        
    }
  else {
    res.send(1)
  }

})


app.listen(PORT, () =>
    console.log('Server working... '+ PORT)

);