import Stripe from "stripe";
import Donate from "../models/donate.model.js";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fundaprotan.official@gmail.com",
    pass: `bybi iykl dygx kvth`,
  },
});

export const getCheckoutSession = async (req, res) => {
  const user = req.user;
  const { amount, email, firstName, lastName } = req.body;
  

  try {
    const items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Donation by ${firstName} ${lastName}`,
            images: ["https://i.ibb.co/vXhdDHV/6-Logo-Verde.png"],
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ];

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/`,
      line_items: items,
      customer_email: email,
    });

    console.log(session);

    const donate = new Donate({
      user: user._id,
      amount: amount,
      sessionId: session.id,
      status: "pending",
    });

    await donate.save();

    res.json({ session });
  } catch (error) {
    console.log("Error in getCheckoutSession: ", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const handleSuccess = async (req, res) => {
  const sessionId = req.body.transactionId;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const donate = await Donate.findOne({ sessionId: sessionId }).populate(
      "user"
    );

    if (!donate) {
      return res.status(404).send("Donate not found");
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentId = session.payment_intent;

    donate.paymentId = paymentId;
    donate.status = "completed";
    await donate.save();
    console.log(donate);
    const emailContent = `
            Dear ${donate.user.firstName} ${donate.user.lastName},        
            <h2 style="text-align: center">Your Invoice</h2>
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 5px; max-width: 400px; margin: 20px auto;">
                <p><strong>Transaction ID:</strong> ${paymentId}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Name:</strong> ${donate.user.firstName} ${
      donate.user.lastName
    }</p>
                <p><strong>Email:</strong> ${donate.user.email}</p>
                <p><strong>Amount:</strong> ${donate.amount.toFixed(2)}</p>
            
            </div>
            <p>Thank you for your donation!</p>
            <p>We sincerely appreciate your support.</p>
            Best regards,
            FUNDAPROTAN
        `;
    await transporter.sendMail({
      from: "fundaprotan.official@gmail.com",
      to: donate.user.email,
      subject: "Donation Confirmation",
      html: emailContent,
    });

    res.send({ paymentId });
  } catch (error) {
    console.error("Error handling success:", error);
    res.status(500).send("Error handling success");
  }
};

export const getUserPaymentHistory = async (req, res) => {
  const { id } = req.params;
  const query = { user: id };

  try {
    const paymentHistory = await Donate.find(query).sort({ _id: -1 });
    res.status(200).send(paymentHistory);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching the payment history." });
  }
};

export const getInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await Donate.findById(id);
    if (!invoice) {
      return res.status(404).send({ message: "Invoice not found" });
    }
    res.status(200).send(invoice);
  } catch (error) {
    console.error("Error fetching Invoice:", error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching Invoice" });
  }
};

export const getAllInvoice = async (req, res) => {
  try {
    const result = await Donate.find().sort({_id: -1});
    res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching Invoice:", error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching Invoice" });
  }
};
