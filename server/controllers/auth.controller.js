import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import nodemailer from "nodemailer";

// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "fundaprotan.official@gmail.com", 
    pass: `bybi iykl dygx kvth`, 
  },
});

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      role,
      verified,
      isActive
    } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP and its expiration time to the user document
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); // OTP expires in 10 minutes

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpires: otpExpiration,
      role,
      verified,
      isActive
    });

    // Save user to database
    await newUser.save();

    // Send OTP via email
    await transporter.sendMail({
      from: "fundaprotan.official@gmail.com",
      to: email,
      subject: "OTP for Email Verification",
      text: `Your OTP for email verification is: ${otp}`,
    });

    // Generate JWT token and set cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Respond with success message
    res.status(201).json({ message: "Verification OTP sent to your email" });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const addAdmin = async (req, res) => {
  try {
    console.log(req.body);
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      role,
      verified,
      isActive
    } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP and its expiration time to the user document
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); // OTP expires in 10 minutes

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpires: otpExpiration,
      role,
      verified,
      isActive
    });

    // Save user to database
    await newUser.save();

    // Send OTP via email
    await transporter.sendMail({
      from: "fundaprotan.official@gmail.com",
      to: email,
      subject: "OTP for Email Verification",
      text: `Your OTP for email verification is: ${otp}`,
    });

    // Generate JWT token and set cookie
    // generateTokenAndSetCookie(newUser._id, res);

    // Respond with success message
    res.status(201).json({ message: "Verification OTP sent to your email" });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const addPublisher = async (req, res) => {
  try {
    console.log(req.body);
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      role,
      verified,
      isActive
    } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP and its expiration time to the user document
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); // OTP expires in 10 minutes

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpires: otpExpiration,
      role,
      verified,
      isActive
    });

    // Save user to database
    await newUser.save();

    // Send OTP via email
    await transporter.sendMail({
      from: "fundaprotan.official@gmail.com",
      to: email,
      subject: "OTP for Email Verification",
      text: `Your OTP for email verification is: ${otp}`,
    });

    // Generate JWT token and set cookie
    // generateTokenAndSetCookie(newUser._id, res);

    // Respond with success message
    res.status(201).json({ message: "Verification OTP sent to your email" });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); // Find user by username

    // Check if user exists
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT token and set cookie
    generateTokenAndSetCookie(user._id, res);

    // Respond with user data
    res.status(200).json({
      _id: user._id,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const verifyOTP = async (req, res) => {
  try {
    const {  otp } = req.body;
    const userId = req.user._id
    console.log(userId,otp);
    // Find user by email
    const user = await User.findById( userId );
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(user);
    // Check if OTP is correct and not expired
    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

   
    user.otp = undefined;
    user.verified = true
    user.otpExpires = undefined;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("Error in verifyOTP controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const forgotPass = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by 			username,

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a random password reset token
    const resetToken = Math.random().toString(36);

    // Update user's resetPasswordToken and resetPasswordExpires fields
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send password reset email
    await transporter.sendMail({
      from: "fundaprotan.official@gmail.com",
      to: `${user.email}`,
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
		  Please click on the following link, or paste this into your browser to complete the process:\n\n
		  http://localhost:5000/reset/${resetToken}\n\n
		  If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetpass = async (req, res) => {
  const { password, resetToken } = req.body;
  console.log(password, resetToken);
  try {
    // Find user by reset token
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log(user);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Update user's password
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};





export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.verified) {
      return res.status(400).json({ error: "Email is already verified" });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); // OTP expires in 10 minutes

    // Update user with new OTP and expiration time
    user.otp = otp;
    user.otpExpires = otpExpiration;

    await user.save();

    // Send OTP via email
    await transporter.sendMail({
      from: "fundaprotan.official@gmail.com",
      to: user.email,
      subject: "Resend OTP for Email Verification",
      text: `Your new OTP for email verification is: ${otp}`,
    });

    res.status(200).json({ message: "Verification OTP resent to your email" });
  } catch (error) {
    console.log("Error in resendOTP controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the ID is passed as a URL parameter
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      verified: user.verified,
      isActive:user.isActive,
      profilePic:user.profilePic
    });
  } catch (error) {
    console.log("Error in getUserById controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;

    // Construct query object based on role and search criteria
    const query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } }, // Case-insensitive search
        { lastName: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Paginate users based on query
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const users = await User.find(query)
      .select('-password -resetPasswordToken -resetPasswordExpires -otp -otpExpires')
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber)
      .exec();

    // Get total count of users for pagination
    const count = await User.countDocuments(query);

    // Send response
    res.status(200).json({
      users,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const getCountUser = async (req,res) =>{
  try {
    // Count the documents in the User collection
    const count = await User.countDocuments();
    // Send the count as the response
    res.send({ count });
  } catch (error) {
    // Handle any errors that occur during the count operation
    console.error('Error counting user documents:', error);
    res.status(500).send('Internal Server Error');
  }
}

export const UpdateRole = async (req, res) =>{
  const { id } = req.params;
  const { role } = req.body;
  if (!role) {
    return res.status(400).send({ error: 'Role is required' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export const UpdateActiveStatus = async (req, res) =>{
  const { id } = req.params;
  const { isActive } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if current password is correct
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log("Error in changePassword controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user._id;
    const { profilePic } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile picture updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to update first name and last name
export const updateName = async (req, res) => {
  try {
    const userId = req.user._id;
    const { firstName, lastName } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Name updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};