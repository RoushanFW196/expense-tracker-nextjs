"use client";

import React, { useEffect, useState } from "react";
import ExpenseForm from "./expense-form/page";
import Login from "./login/page";

interface userType {
  createdAt: Date;
  email: string;
  password: string;
  updatedAt: Date;
  __v: number;
  _id: string;
}

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user: userType = JSON.parse(storedUser);
      if (user._id) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  return <>{isLoggedIn ? <ExpenseForm /> : <Login />}</>;
};

export default Page;
