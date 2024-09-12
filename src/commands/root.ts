import { SubCommand } from "../command.js";
import DecryptCMD from "./decrypt.js";
import EncryptCMD from "./encrypt.js";
import HelpCMD from "./help.js";
import VersionCMD from "./version.js";

export default class RootCMD extends SubCommand {

    protected registerHelpCommand() {
        const help = new HelpCMD();
        this.register("auto", help);
        this.register("help", help);
        this.register("--help", help);
    }

    protected registerCommands(): void {
        this.registerHelpCommand();
        this.register("-v", new VersionCMD());
        this.register("encrypt", new EncryptCMD());
        this.register("decrypt", new DecryptCMD());
    }

}
