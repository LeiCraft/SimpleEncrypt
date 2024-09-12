import fs from 'fs';
import { Inputs } from './inputSecrets.js';
import { KeyPair, type PrivateKey } from '../crypto/cryptoKeys.js';
import LCrypt from '../crypto/lcrypt';
import { Uint } from './binary.js';

export namespace Utils {

    export async function checkInputAndOutputFiles(inputFile: string, outputFile: string) {
        if (!fs.existsSync(inputFile)) {
            console.error(`File ${inputFile} does not exist`);
            return false;
        }

        if (fs.existsSync(outputFile)) {
            return await Inputs.fileOverwritePrompt(outputFile)
        }

        return true;
    }

    export function getSharedSecretFromPasswd(passwd: string) {
        const keypair = KeyPair.fromPrivate(LCrypt.genPrivateKeyFromPasswd(passwd));
        const sharedSecret = keypair.derive(keypair.getPublic());
        return sharedSecret;
    }

    export function readFromSourceFile(sourceFile: string) {
        try {
            return Uint.from(fs.readFileSync(sourceFile));
        } catch (error: any) {
            console.error(`Error reading file: ${error.message}`);
            return false;
        }
    }

    export function writeToFile(outputFile: string, data: Uint) {
        try {
            fs.writeFileSync(outputFile, data.getRaw());
        } catch (error: any) {
            console.error(`Error writing file: ${error.message}`);
            return false;
        }
        return true;
    }

}