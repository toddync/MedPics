// @ts-nocheck
import { Account, Client, Databases, Teams } from "appwrite";

const client = new Client()
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject("665781950035e4fd8bc4");

export const databases = new Databases(client);
export const account = new Account(client);
export const teams = new Teams(client);

export const db = "6657af020009478061c0";
export const modulesDB = "6657af150036aa592e15";
export const quizzesDB = "6659fcb5000c04c447db";
export const professorsTeam = "6657a5e200160dc5390b";
