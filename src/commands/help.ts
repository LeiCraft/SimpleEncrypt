import { Command } from "../command.js";

export default class HelpCMD extends Command {
    async run(args: string[]) {
        console.log("Available Commands:");
        console.log("- help: prints this help message");
        console.log("- -v: prints the version of the program");
        console.log("- encrypt <sourceFile> <outputFile>: encrypts a file");
        console.log("- decrypt <sourceFile> <outputFile>: decrypts a file");
    }
}
