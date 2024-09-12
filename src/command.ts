
export abstract class Command {
    abstract run(args: string[]): Promise<void>;
}

export abstract class SubCommand extends Command {

    protected readonly registry: {[key: string]: Command} = {};

    constructor() {
        super();
        this.registerCommands();
    }

    protected register(key: string, cmd: Command) {
        this.registry[key] = cmd;
    }

    protected abstract registerCommands(): void;

    async run(args: string[]) {
        const cmd_name = args[0] as string | undefined;

        if (!cmd_name) {
            return this.registry["auto"].run([]);
        }

        const cmd = this.registry[cmd_name] as SubCommand | undefined;

        if (!cmd) {
            console.log(`Invalid Command: ${cmd_name}`);
            console.log(`Run simple-encrypt --help`);
            return;
        }

        await cmd.run(args.slice(1));
    }

}