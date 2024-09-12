import RootCMD from "./commands/root";
import prompt from "prompt";

class Main {
    static async init() {
        try {
            
            prompt.message = '';
            prompt.delimiter = '';
            prompt.start();
    
            await new RootCMD().run(process.argv.slice(2));
    
            prompt.stop();

        } catch (error: any) {
            console.error(`Error: ${error.message}`);
        }
    }
}

await Main.init();
