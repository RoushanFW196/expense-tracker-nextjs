import connectDb from '../../../lib/mongodb';
import User from '../../../models/user';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';


export async function POST(req) {
  try {
    const { email, password } = await req.json();  // Parse JSON request body
    
    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Connect to the database
    await connectDb();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Return success response
    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

