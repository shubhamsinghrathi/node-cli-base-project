import { createInterface, Interface } from "readline";

export interface CommandEntry {
    command: string;
    method: Function;
}

interface CliControllerArgs {
    cliInterface?: Interface;
    inputFormatter?: InputFormatter;
    exitOperation?: Function;
    helpText?: string;
}

interface InputFormatter {
    format(input: string): Array<string>;
}

export interface CliController {
    addCommands(commands: Array<CommandEntry>): void;
    start(): Promise<void>;
}

const CliQuestion = (cliInterface: Interface): Promise<string> => {
    return new Promise((resolve) => {
        cliInterface.question(">> ", input => {
            return resolve(input);
        });
    });
}

class InputFormatterImpl implements InputFormatter {
    public format(input: string): Array<string> {
        let inputArr: Array<string> = input.trim().split(" ");
        return inputArr.filter(str => {
            if (str.length > 0) return true;
            return false;
        });
    }
}

export class CliControllerImpl implements CliController {
    private commands: Map<string, Function> = new Map();
    private cliInterface: Interface;
    private inputFormatter: InputFormatter;
    private helpText: string = `
        Welcome to this CLI interface app!\n
        Options:\n
        1) help :: To get the help
        2) exit :: To exit from this application
    `;
    private exitOperation: Function;

    constructor(args: CliControllerArgs = {}) {
        if (args.cliInterface) this.cliInterface = args.cliInterface;
        else {
            this.cliInterface = createInterface({
                input: process.stdin,
                output: process.stdout
            });
        }
        if (args.exitOperation) this.exitOperation = args.exitOperation;
        if (args.helpText) this.helpText = args.helpText;
        if (args.inputFormatter) this.inputFormatter = args.inputFormatter;
        else this.inputFormatter = new InputFormatterImpl();
    }

    private addCommand(command: CommandEntry) {
        if (this.commands.has(command.command)) {
            throw Error("Duplicate command found");
        }
        this.commands.set(command.command, command.method);
    }

    private async getResponse(input: Array<string>): Promise<string> {
        if (!this.commands.has(input[0])) {
            return "Error: Invalid command\n" + this.helpText;
        }
        try {
            return await this.commands.get(input[0])(input.splice(1));
        } catch(err) {
            return `Error: ${err.message}`
        }
    }

    public addCommands(commands: Array<CommandEntry>): void {
        commands.forEach(command => {
            this.addCommand(command);
        });
    }

    public async start(): Promise<void> {
        while(true) {
            let input: Array<string> = this.inputFormatter.format(await CliQuestion(this.cliInterface));
            if (input[0] === "exit") {
                if (this.exitOperation) {
                    this.exitOperation();
                }
                break;
            } else if (input[0] === "help") {
                this.cliInterface.write(this.helpText);
            } else {
                this.cliInterface.write(await this.getResponse(input) + '\n');
            }
        }
        this.cliInterface.close();
    }
}