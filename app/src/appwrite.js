import { Account, Client, Teams } from "appwrite";
const client = new Client();

client
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject("665781950035e4fd8bc4");

export const account = new Account(client);
export const teams = new Teams(client);

export { ID } from "appwrite";
