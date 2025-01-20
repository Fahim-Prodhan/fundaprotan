import { Preference } from "mercadopago";
import { MercadoPagoConfig } from "mercadopago";
import nodemailer from "nodemailer";
import Donate from "../models/donate.model.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fundaprotan.official@gmail.com",
    pass: `bybi iykl dygx kvth`,
  },
});

export const createPayment = async (req, res) => {
  const user = req.user;
  const { amount, email, firstName, lastName } = req.body;

  try {
    // Initialize Mercado Pago client with the provided access token
    const client = new MercadoPagoConfig({
      accessToken:
        "TEST-209959251788759-060915-da341f5978a5c5033d2ec4a3877361cd-217118838",
      options: {
        timeout: 5000,
        idempotencyKey: "abc",
      },
    });

    // Create a new preference
    const preference = new Preference(client);

    // Set the preference data
    const preferenceData = {
      items: [
        {
          title: "Donation",
          description: `Donated by ${firstName} ${lastName}`,
          quantity: 1,
          unit_price: parseInt(amount), // Ensure unit price is a valid number
          currency_id: "USD", // Ensure currency_id is valid
          picture_url: "https://i.ibb.co/vXhdDHV/6-Logo-Verde.png",
        },
      ],
      payer: {
        email: email,
      },
      back_urls: {
        success: `${process.env.CLIENT_URL}/api/pay/pay-success`,
        failure: `${process.env.CLIENT_URL}/`,
      },
    };

    // Create the preference
    const response = await preference.create({ body: preferenceData });

    // Handle the response
    console.log(response);

    const donate = new Donate({
      user: user._id,
      amount: amount,
      sessionId: response.id,
      status: "pending",
    });

    await donate.save();

    // Send the response to the client
    res.status(201).json(response);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const handleSuccess = async (req, res) => {
  const sessionId = req.query.preference_id;

  try {
    const donate = await Donate.findOne({ sessionId: sessionId }).populate(
      "user"
    );

    if (!donate) {
      return res.status(404).send("Donation not found");
    }

    donate.status = "completed";
    await donate.save();

    const emailContent = `
              Dear ${donate.user.firstName} ${donate.user.lastName},        
              <h2 style="text-align: center">Your Invoice</h2>
              <div style="border: 1px solid #ddd; padding: 10px; border-radius: 5px; max-width: 400px; margin: 20px auto;">
                  <p><strong>Transaction ID:</strong> ${sessionId}</p>
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

    res.send({ sessionId });
  } catch (error) {
    console.error("Error handling success:", error);
    res.status(500).send("Error handling success");
  }
};
