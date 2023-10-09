const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  if (total == 0) {
    return;
  }
  console.log("Payment Request Recieved for this amount >>> ", total);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total),
      currency: "usd",
    });

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error); // Log the full error object for detailed information
    console.error(error.message); // Log the error message
    response.status(500).send("Something went wrong");
  }
});
app.listen(5000, (err) => {
  if (err) {
    console.log(err.messege);
  } else {
    console.log("listning to 5000");
  }
});

// exports.api = functions.https.onRequest(app);

//http://127.0.0.1:5001/clone-6e990/us-central1/api
//http://127.0.0.1:5001/clone-6e990/us-central1/api
