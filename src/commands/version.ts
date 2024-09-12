import { Command } from "../command.js";

export default class VersionCMD extends Command {
    async run(args: string[]) {
        console.log(process.env.SIMPLE_ENCRYPT_VERSION);
    }
}
