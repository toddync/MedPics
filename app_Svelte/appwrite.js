// @ts-nocheck
import { Account, Client, Teams, Databases } from "appwrite";

const client = new Client()
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject("665781950035e4fd8bc4");

export const databases = new Databases(client);
export const account = new Account(client);
export const teams = new Teams(client);
