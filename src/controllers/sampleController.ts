import { IValidator } from "../services/validator";

export interface ISampleController {
    test(args: Array<string>): string;
}

export class SampleController implements ISampleController {
    private validator: IValidator;

    constructor(validator: IValidator) {
        this.validator = validator;
    }

    public test(args: Array<string>): string {
        this.validator.test(args);
        const myArgs = args.join(" ");
        return myArgs;
    }
}