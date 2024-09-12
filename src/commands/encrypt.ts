import { Command } from "../command.js";
import { Inputs } from "../utils/inputSecrets.js";
import LCrypt from "../crypto/lcrypt.js";
import path from 'path';
import { Utils } from "../utils/utils.js";

export default class EncryptCMD extends Command {

    private usage = "simple-encrypt encrypt <source> [<output>]";

    async run(args: string[]) {
        if (args.length < 1 && args.length > 2) {
            console.log(`Usage: ${this.usage}`);
            return;
        }

        const sourceFile = args[0];

        let outputFile = (args[1] || path.basename(sourceFile));
        if (!outputFile.endsWith('.enc')) {
            outputFile += '.enc';
        }

        if (!await Utils.checkInputAndOutputFiles(sourceFile, outputFile)) return;

        const passwd = await Inputs.newPassword();
        if (!passwd) return;

        const sharedSecret = Utils.getSharedSecretFromPasswd(passwd);

        const sourceData = Utils.readFromSourceFile(sourceFile);
        if (!sourceData) return;
        
        const encryptedDataResult = Utils.writeToFile(outputFile, LCrypt.encryptData(sourceData, sharedSecret));
        if (!encryptedDataResult) return;

        console.log(`Encrypted data was written to ${outputFile}`);
    }
}

