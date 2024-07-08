const express = require('express');
const mongoose = require('mongoose');


async function  dbConnetion  ()  {
  try {
    await mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Database Connected");
    })
  } catch (error) {
    console.log("Database Connection Failed");
  }
}

module.exports = dbConnetion