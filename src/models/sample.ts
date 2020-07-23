import { Schema, model, Model, Document } from 'mongoose';

interface ISample extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
}

const schema: Schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    name: {
        type: String,
        required: true,
        default: "Test_Name"
    }
});

export const SampleModel: Model<ISample> = model("samples", schema);