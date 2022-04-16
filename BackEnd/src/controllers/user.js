import mongoose from "mongoose";
import { CourierClient } from "@trycourier/courier";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { UserSchema } from "../models/user.js";
import { config } from "dotenv";
import randtoken from "rand-token";

config();

const courier = CourierClient({
  authorizationToken: "pk_prod_6ZHRBMMT76454JGVAXRHG71PFGZ7",
});

const User = mongoose.model("Users", UserSchema);

export const create_new_user = [
  body("first_name", "First Name is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last Name is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email ID is required").trim().escape().isEmail(),
  body("password", "Password Length should be greater than 6")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  async (req, res) => {
    // Check if password is equal to confirm_password
    await body("confirm_password")
      .trim()
      .equals(req.body.password)
      .withMessage("Passwords do not match")
      .run(req);

    // Reports the errors of validation and returns the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body, errors.array(), "Error are found");
      return res.status(406).json({ message: JSON.stringify(errors.array()) });
    }

    const { email } = req.body;
    try {
      // Step1: Check if email exists in our database.
      const email_exists = await User.findOne({ email }).exec();
      if (email_exists) {
        return res.status(409).json({
          message: "Email is already in use.",
        });
      }

      // Step2: Create the User and save to database.
      let new_user = await new User(req.body);
      new_user.save((err, user) => {
        if (err) {
          console.log(err, user, "Error while saving the user");
          res.send(err);
        } else {
          console.log(user, "User is saved...");
          // res.send(user)
        }
      });

      // Step3: Generate a verification Token with "User ID" of 'newly created User'.
      const verificationToken = new_user.generateVerificationToken();
      console.log(verificationToken);

      // Step4: Email the User a unique verification link.
      const url = `http://localhost:4000/userverification/${verificationToken}`;
      console.log(url);

      // Step5: Send Email using transporter.
      const { requestId } = await courier.send({
        message: {
          to: {
            email: email,
            name: {
              first: new_user.first_name,
              last: new_user.last_name,
            },
          },
          template: "GKXZATQJD04XHCKW3V0P846HH9GX",
          data: {
            link: url,
          },
        },
      });

      return res.status(201).send({
        message: `Verification Email is being sent to ${email}`,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
];

export const user_verify = [
  async (req, res) => {
    const token = req.params.verificationToken;

    console.log(token);

    if (!token) {
      return res.status(422).send({
        message: "Missing Token",
      });
    }
    // Step1: Verify the token from the url
    let payload = null;
    try {
      payload = jwt.verify(token, process.env.USER_VERIFICATION_TOKEN_SECRET);
    } catch (err) {
      return res.status(500).send(err);
    }

    try {
      // Step2: Find the user with matching ID
      const user = await User.findOne({ id: payload.ID }).exec();
      if (!user) {
        return res.status(404).send({
          message: "User does not exists",
        });
      }

      // Step3: Update the User verifaction status to true.
      console.log(user);
      user.isVerified = true;
      await user.save();

      return res.status(200).send({
        message: "Account is verified.",
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const reset_password_link = [
  body("email", "Email ID is required").trim().escape().isEmail(),
  async (req, res) => {
    const email = req.body.email;

    // Step1: Check if user with the email exists in our database.
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(409).send({
        message: "No user with this email.",
      });
    }

    // Step2: Using rand token generate the token for the user ID.
    const token = randtoken.generate(20);
    console.log(token);

    // Step3: Store the token in database under the user with that email.
    var datetime = Date.now();
    console.log(datetime);

    user.token = token;
    user.token_datetime = datetime;
    user.save();

    // Step4: Create forgot password link with token.
    const url = `http://localhost:4000/update_password/${token}`;
    console.log(url);

    // Step5: Email the link
    const { requestId } = await courier.send({
      message: {
        to: {
          email: user.email,
          name: {
            first: user.first_name,
            last: user.last_name,
          },
        },
        template: "4H7GBWZY7WMDKFN9885V1YZZFKKX",
        data: {
          link: url,
        },
      },
    });

    // Step6: Send the res to frontend.
    res.send(
      "The reset password link is being sent to your reegistered email ID."
    );
  },
];

export const update_password = [
  body("new_password", "Password Length should be greater than 6")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  async (req, res) => {
    // Check if password is equal to confirm_password
    await body("confirm_new_password")
      .trim()
      .equals(req.body.new_password)
      .withMessage("Passwords do not match")
      .run(req);

    // Reports the errors of validation and returns the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body, errors.array(), "Error are found");
      return res.json({ errors: errors.array() });
    }

    // Step1: extract token,
    // new password and
    // confirm new password from the link.
    const token = req.body.token;
    const new_password = req.body.new_password;
    console.log(token);

    if (!token) {
      return res.status(401).send("No token found.....");
    }

    // Step2: Using token extract the user.
    const user = await User.findOne({ token: token }).exec();
    if (!user) {
      return res.status(400).send("Token is expired...");
    }

    // Step3: Check if token is not expired.
    const datetime = user.token_datetime;
    let nowtime = Date.now();
    let time_elapsed = (nowtime - datetime) / 1000 / 60;
    console.log(time_elapsed);
    if (time_elapsed > 10) {
      return res.send("This link is expired now.");
    }

    // Step4: Update the user password into the database.
    // This password will be hashed, to protect the user using bcrypt.
    user.password = new_password;
    user.save();

    // Step5: Return the response.
    res.send("User password is updated....");
  },
];

export const log_the_user=[
  body("email", "Email ID is required").trim().escape().isEmail(),
  body("password", "Password Length should be greater than 6")
    .trim()
    .isLength({ min: 6 })
    .escape(),
    async(req,res)=>{
      // Step1: Check if user with this email exists.

      // Step2: Check if password is correct or not.

      // Step3: Generate a token and return it to frontend.

      
    }
]
