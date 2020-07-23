export class SampleController {
    public static test(...args: Array<string>): string {
        if (args.length == 0) {
            throw Error("no argument provided, please provide atleast one argument");
        }

        const myArgs = args.join(" ");
        return myArgs;
    }
}