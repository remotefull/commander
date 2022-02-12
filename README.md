<center>
<h2>remotefull/commander</h2>
Executing commands on remote servers made easy.
</center>

<hr>

## Getting started

There is 1 available command remote right now:

- SshCmdRemote

All command remotes extend BaseCmdRemote. Feel free to implement your own.

## Usage

1. Install the `@remotefull/commander` package using Yarn or NPM
2. Import your desired command remote:

```ts
// Require
const { SshCmdRemote } = require("@remotefull/commander");

// ES6
import { SshCmdRemote } from "@remotefull/commander";
```

3. Use the command remote:

```ts
const config = {
  host: "",
  port: 22,
  username: "",
  password: "",
};

const remote = new SshCmdRemote(config);

await remote.connect();

const out = await remote.execute("whoami");
console.log("output", out);

await remote.disconnect();
```

## Example

This package really shines in the abstraction it creates. It provides functions that are the same no matter the remote. This means that you can implement your application logic without caring about the different remotes. For example

```ts
import * as Remotes from "@remotefull/commander";

// The application logic itself doesn't need to worry
// about what remote is used.
class YourApp {
  constructor(private remote: Remotes.BaseCmdRemote) {}

  public async run() {
    const cmd = `${
      (await this.isRoot()) ? "sudo " : ""
    } apt-get install docker-ce -y`;

    await this.client.connect();

    const stream = await this.remote.executeStream(cmd);
    stream.on("data", data => console.log("output:", data));
    stream.on("end", () => this.client.disconnect());
  }

  private async isRoot(): Promise<boolean> {
    return (await this.remote.execute("whoami")) === "root";
  }
}

// This is just a placeholder for credentials config
const config = {
  // ...
};

const remote = new Remotes.SshCmdRemote(config);
const app = new YourApp(remote);
```
