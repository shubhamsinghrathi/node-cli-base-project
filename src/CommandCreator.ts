import { SampleController, ISampleController } from "./controllers/sampleController";
import { CommandEntry } from "./CliController";
import { IValidator, Validator } from "./services/validator";

export class CommandCreator {
    private static sampleController: ISampleController;

    public static commands(): Array<CommandEntry> {
        const validator: IValidator = new Validator();
        this.sampleController = new SampleController(validator);
        return [
            {
                command: "test",
                method: this.sampleController.test.bind(this.sampleController)
            }
        ];
    }
}