import { Duplex } from "stream";

export abstract class BaseCmdRemote<TClient = any> {
  protected constructor(protected client: TClient) {}

  public getClient() {
    return this.client;
  }

  private _fni(): any {
    throw new Error("Function not implemented");
  }

  public async connect(): Promise<BaseCmdRemote<TClient>> {
    return this._fni();
  }

  public async disconnect(): Promise<void> {
    this._fni();
  }

  public async execute(command: string): Promise<string> {
    return this._fni();
  }

  public async executeWithStream(command: string): Promise<Duplex> {
    return this._fni();
  }
}
