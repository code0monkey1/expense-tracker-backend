import { Document, Schema, model } from "mongoose";

// create an Expense document schema
export interface ExpenseType extends Document {
    title: string;
    amount: number;
    category: string;
    recorded_on: Date;
    notes: string;
    recorded_by: Schema.Types.ObjectId;
}

const expenseSchema = new Schema<ExpenseType>(
    {
        title: {
            type: String,
            trim: true,
            required: true, // Change 'required' to boolean true
        },
        amount: {
            type: Number,
            min: [0, "Amount must be greater than or equal to 0"],
            required: true, // Change 'required' to boolean true
        },
        category: {
            type: String,
            trim: true,
            required: true, // Change 'required' to boolean true
            lowercase: true,
        },
        recorded_on: {
            type: Date,
            default: Date.now,
        },
        notes: {
            type: String,
            trim: true,
        },
        recorded_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    },
);

// delete the __v and the _id fields from the response object
expenseSchema.set("toJSON", {
    transform: function (doc, ret) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    },
});

const Expense = model<ExpenseType>("Expense", expenseSchema);

export default Expense;
