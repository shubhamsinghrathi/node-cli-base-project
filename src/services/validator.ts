export interface IValidator {
    test(args: Array<string>): void;
}

export class Validator implements IValidator {
    public test(args: Array<string>) {
        if (args.length == 0) {
            throw Error("no argument provided, please provide atleast one argument");
        }
    }
}