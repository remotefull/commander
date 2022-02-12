import SSH2Promise from "ssh2-promise";
import SSHConfig from "ssh2-promise/lib/sshConfig";
import { Channel } from "ssh2";
import { BaseCmdRemote } from "./BaseCmdRemote";
import { Duplex } from "stream";

export class SshCmdRemote extends BaseCmdRemote<SSH2Promise> {
  constructor(config: SSHConfig) {
    super(new SSH2Promise(config));
  }

  public async connect(): Promise<SshCmdRemote> {
    await this.client.connect();
    return this;
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
  }

  public async execute(command: string): Promise<string> {
    return new Promise(async resolve => {
      const stream = await this.executeWithStream(command);
      let out = "";

      stream.on("data", line => (out += `${String(line)}\n`));
      stream.on("end", () => resolve(out));
    });
  }

  public async executeWithStream(command: string): Promise<Duplex> {
    return (await this.client.spawn(command)) as Channel;
  }
}
