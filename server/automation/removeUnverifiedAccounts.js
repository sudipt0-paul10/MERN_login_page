//this is setup to remove unverfied accounts from the database after 30 minutes of creation

import cron from "node-cron";

import { User } from "../models/userModel.js";

export const removeUnverifedccounts = ()=>{
  cron.schedule("* * * * *",async() =>{
    //the stars represent minute-hour-day of month-month-day of week
    const thirtyMinutesAgo = new Date(Date.now() - 30*60*1000);
    await User.deleteMany({
      accountVerified: false;
      createdA: {$lt: thirtyMinutesAgo},
    });
  });
};