import { Client } from "pg";

export default class DatabaseClient {
  private static instance: DatabaseClient;
  private client: Client;
  private connected: boolean = false;

  private constructor() {
    this.createClient();
  }

  public static getInstance(): DatabaseClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new DatabaseClient();
    }
    return DatabaseClient.instance;
  }

  private createClient() {
    this.client = new Client({
      host: "127.0.0.1",
      user: "postgres",
      password: "postgres",
      database: "postgres",
      port: 54322,
    });
  }

  public async connect(): Promise<void> {
    if (!this.connected) {
      this.createClient();
    }
    await this.client.connect();
    this.connected = true;
    console.log("Database connected");
  }

  public getClient(): Client {
    if (!this.connected) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.client;
  }

  public async disconnect(): Promise<void> {
    if (this.connected) {
      await this.client.end();
      this.connected = false;
      console.log("Database disconnected");
    }
  }
}
