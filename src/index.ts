import { CliController, CliControllerImpl } from './cliController';
import { Constants } from './common/Constants';


/*

## REMOVE THESE COMMENTS ##

$ Hello There, welcome to splitwise CLI app
>> sadfdsafd
$ invalid input, please enter help for all options
>> help
$ login <username> - To login to app. Exp. [login shubham]
  exit - To exit the interface
  help - to get help
  add <total money> <user1> <%age paid by user1> <user2> <%age paid by user2> - To enter money. Exp. [add 100 ss 30 pp 0 qq 20]
  pending <username> - To get the pending balance from a user. Exp. [pending abc]
  settle <username> - To settle balance with a user. Exp. [settle shubham]
>> add
$ invalid format. required: add <total money> <user1> <%age paid by user1> <user2> <%age paid by user2>
>> add 100 uu 0
$ please login first
>> login shubham
$ add 100 uu 0
>> added successfully

*/

class Runner {
    private cliController: CliController;

    constructor () {
        this.init();
    }

    private init() {
        this.cliController = new CliControllerImpl({
            helpText: Constants.helpText,
            exitOperation: () => {
                console.log("Exitting...");
            }
        });
        this.addCommands();
    }

    private addCommands() {
        this.cliController.addCommands([]);
    }

    public run() {
        this.cliController.start();
    }
}

new Runner().run();