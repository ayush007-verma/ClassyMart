const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const open = require('openurl');
const saltRounds = 10;
const PORT = process.env.PORT || 8000;


const app = express()

const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecom-react'
});



app.get("/", (req, res) => {
    res.send("hi")
})
// get data 
app.get("/getdataall", (req, res) => {
    let sql = `select * from products`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})
app.get("/getdata", (req, res) => {
    let sql = `select * from products ORDER BY RAND() limit 6`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })

})
app.get("/getdata/:id", (req, res) => {
    const id = req.params.id;
    let sqll = `select * from products where id=${id}`;
    db.query(sqll, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })


})
app.get("/sort/:price", (req, res) => {
    const price = req.params.price;
    if (price === '200') {
        let sqll = `select * from products WHERE price < 200`;
        db.query(sqll, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(result)
            }
        })
    }
    else if (price === '200_500') {
        let sqll = `select * from products WHERE price >=200 && price <= 500`;
        db.query(sqll, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(result)
            }
        })

    }
    else if (price === '500_1000') {
        let sqll = `select * from products WHERE price > 500 && price <= 1000`;
        db.query(sqll, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(result)
            }
        })

    }



})

app.get("/getaddress/:userid", (req, res) => {
    const userid = req.params.userid
    let sql = `select * from user_data where user_id=${userid}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})


app.get("/account/:id", (req, res) => {
    const id = req.params.id;
    let sqll = `select * from orders where user_id=${id} && order_status='order done'`;
    db.query(sqll, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {

            res.send(result)
        }
    })

})

app.post("/saveorder", (req, res) => {
    const {
        cart,
        amount,
        id,
        created_at
    } = req.body;

    let sqlinsert = 'INSERT INTO '
})

app.get("/myorder/:id", (req, res) => {
    const id = req.params.id;
    // let sqll=`select * from orderitems where orderid=${id}`;
    let sqll = `SELECT * FROM orderitems,products WHERE orderitems.productid = products.id && orderitems.orderid=${id}`
    db.query(sqll, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})
// added comt

// post details 

app.post("/addaddress", (req, res) => {
    console.log(req.body)
    const sqlInsert = "INSERT INTO user_data (  name, email, phone, address, user_id)"
    const values = `VALUES ("${req.body.name}", "${req.body.email}", ${req.body.phone}, "${req.body.address}", ${req.body.user_id});`

    db.query((sqlInsert + values), (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ msg: "Address inserted Successfully" })
        }
    })

})

/* Razor Pay Payment*/

const Razorpay = require('razorpay')


var instance = new Razorpay({ key_id: 'rzp_test_cRKMALlwldZBvI', key_secret: 'IaQKhTtFeLNYyPe7bI4VGGBD' })
// IaQKhTtFeLNYyPe7bI4VGGBD
// rzp_test_cRKMALlwldZBvI

// app.post("/orders", (req, res) => {
//     try {
//         const paymentResponse = instance.orders.create({
//             amount: 1000000,
//             currency: "INR",
//             receipt: "Receipt no. 1",
//             notes: {
//               notes_key_1: "Tea, Earl Grey, Hot",
//               notes_key_2: "Tea, Earl Grey… decaf",
//             }
//         })
//         res.status(200).json({ msg: "paymentSuccess", response: paymentResponse })
//     } catch(err) {
//         res.status(500).json({error : err, msg : "error in payments"})
//     }
// })

// app.get('/orders', async (req, res) => {
//     try {
//         const response = await instance.orders.all(option)
//         res.status(200).json({ msg: "getOrders", response: response })

//     } catch (error) {
//         res.status(500).json({error : error, msg : "error in payments"})
//     }
// })

app.post("/buynow", async (req, res) => {
    /*
     userid: dat,
            totalprice: total,
            orderstatus:"order Not Done",
            paymentmode: payment,
            paymentemail: datemail,
            name: datname,
            cart: cart
         */

    console.log(req.body)

    const { name, totalprice, paymentemail } = req.body;
    // console.log("name", name)
    // console.log("totalprice", totalprice)
    // console.log("paymentemail", paymentemail)

    try {
        const paymentResponse = await instance.orders.create({
            amount: totalprice,
            currency: "INR",
            receipt: "paymentReceipt",
            notes: {
                key1: name,
                key2: paymentemail
            }
        })
        res.status(200).json({ msg: "paymentSuccess", response: paymentResponse })
    } catch (err) {
        res.status(500).json({ error: err, msg: "error in payments" })
    }
})

app.post("/paydetails", (req, res) => {

    const pid = req.body.pid
    const pyid = req.body.pyid

    if (pid === pyid) {
        let sql = `update orders set orderstatus="order done" where paymentid='${pid}'`
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {

                res.send({ msg: "order done Successfully" })

            }
        })
    }


})

// edit address 

app.post("/editadd", (req, res) => {

    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const address = req.body.address
    const user_id = req.body.userId


    let sql = `update user_data set name='${name}',email='${email}',phone='${phone}',address='${address}' where user_id=${user_id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {

            res.send({ msg: "edit Successfully" })

        }
    })

})



app.post("/register", (req, res) => {
    const email = req.body.email;

    const username = req.body.username;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (errr, hash) => {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: hash,
        };
        if (errr) {
            console.log("error")
            console.log(err);
        }
        else {
            let sqll = `select * from users where email='${email}'`;
            db.query(sqll, (er, ress) => {
                if (ress.length > 0) {
                    res.send({ msg: "User Email Already Present" })
                }
                else {
                    let sql = "INSERT INTO `users` SET ?";
                    db.query(sql, data, (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            //  console.log(result);
                            res.send(result);
                            // res.send()

                        }
                    })
                }
            })



        }


    })



})

const verifyJwt = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        res.send({ login: false, msg: "need token" });
    }
    else {
        jwt.verify(token, 'ecomreact', (err, decoded) => {
            if (err) {
                res.send({ login: false, msg: "need for token" });
            }
            else {
                req.userID = decoded.id;
                next();
            }
        })
    }
}

app.get("/isAuth", verifyJwt, (req, res) => {
    res.send({ login: true, msg: "done" });
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log("req.body")
    console.log(email);
    console.log(password)

    let sql = `select * from users where email='${email}'`;
    // console.log(sql);
    db.query(sql, (err, result) => {
        if (err) {
            // res.send({err:err})
            console.log(err);
        }
        else {
            console.log(result)
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (errr, response) => {
                    if (response) {
                        const id = result[0].id;
                        const token = jwt.sign({ id }, "ecomreact", {
                            expiresIn: 60 * 60 * 24,
                        })
                        res.send({ login: true, token: token, user: result[0].username, userID: result[0].id, userEmail: result[0].email })
                        // res.send({login:true,user:result[0].name})
                    }
                    else {
                        res.send({ login: false, msg: "Wrong Password" });

                    }
                })



            }
            else {
                console.log("else req.body")
                console.log(email);
                console.log(password)
                res.send({ login: false, msg: "User Email Not Exits" });
                // console.log("noo email ")
            }


        }
    })




})


app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})


/* add all products from api */

const products = []


app.post('/addProductsApi', (req, res) => {
    console.log(req.body.category)

    const sqlquery = 'insert into products (id, title, price,description, category, image, rating, buy_count)'
    const values = `values (${req.body.id}, "${req.body.title}", ${req.body.price},"${req.body.description}", "${req.body.category}", "${req.body.image}", ${req.body.rating.rate}, ${req.body.rating.count})`
    db.query((sqlquery + values), (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
})

/**
 * {
  id: 20,
  title: 'DANVOUY Womens T Shirt Casual Cotton Short',
  price: 12.99,
  description: '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
  category: "women's clothing",
  image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
  rating: { rate: 3.6, count: 145 }
}
 * 
 */

const productsList = require('./Constants/data')

app.get('/products', (req, res) => {
    res.status(200).json({ msg: "success", products: productsList })
})



/* razor pay  */


// var instance = new Razorpay({
//     key_id: 'rzp_test_LpDSKdGaX4REP5',
//     key_secret: 'biJs7WotcLKxYRLTcAk9N1gH',
// });

// instance.payments.fetch(paymentId)

// instance.payments.all({
//     from: '2016-08-01',
//     to: '2016-08-20'
// }).then((response) => {
//     // handle success
// }).catch((error) => {
//     // handle error
// })