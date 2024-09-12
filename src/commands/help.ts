import { Command } from "../command.js";

export default class HelpCMD extends Command {
    async run(args: string[]) {
        console.log("Available Commands:");
        console.log("- encrypt <sourceFile> <outputFile>");
        console.log("- decrypt <sourceFile> <outputFile>");
    }
}
