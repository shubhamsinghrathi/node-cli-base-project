import { CliController, CliControllerImpl } from './cliController';
import { Constants } from './common/Constants';
import * as mongoose from 'mongoose';
import { CommandCreator } from './CommandCreator';

class Runner {
    private cliController: CliController;

    constructor () {
        this.init();
    }

    private init() {
        this.cliController = new CliControllerImpl({
            helpText: Constants.helpText,
            exitOperation: () => {
                mongoose.disconnect();
                console.log("Exitting...");
            }
        });
        this.addCommands();
        this.connectDB();
    }

    private addCommands() {
        this.cliController.addCommands(CommandCreator.commands());
    }

    private async connectDB() {
        mongoose.connect(Constants.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => {
            console.log("Error while connecting to DB: ", err.message);
            process.exit();
        });
    }

    public run() {
        this.cliController.start();
    }
}

new Runner().run();