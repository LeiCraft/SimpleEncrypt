import { Command } from "../command.js";
import path from 'path';
import fs from 'fs';
import { Inputs } from "../utils/inputSecrets.js";
import LCrypt from "../crypto/lcrypt.js";
import { Uint } from "../utils/binary.js";
import { Utils } from "../utils/utils.js";

export default class DecryptCMD extends Command {

    private usage = "simple-encrypt decrypt <source> [<output>]";

    async run(args: string[]) {
        if (args.length < 1 && args.length > 2) {
            console.log(`Usage: ${this.usage}`);
            return;
        }

        const sourceFile = args[0];
        
        let outputFile = (args[1] || path.basename(sourceFile));
        if (outputFile.endsWith('.enc')) {
            outputFile = outputFile.slice(0, -4);
        }

        if (!await Utils.checkInputAndOutputFiles(sourceFile, outputFile)) return;

        const passwd = await Inputs.enterPassword();
        if (!passwd) return;

        const sharedSecret = Utils.getSharedSecretFromPasswd(passwd);

        const encryptedData = Utils.readFromSourceFile(sourceFile);
        if (!encryptedData) return;
        
        const decryptedDataResult = Utils.writeToFile(outputFile, LCrypt.decryptData(encryptedData, sharedSecret));
        if (!decryptedDataResult) return;

        console.log(`Decrypted data was written to ${outputFile}`);
    }

}
