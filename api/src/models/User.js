import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/, "Invalid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password should be at least 6 characters long!"],
      maxLength: [20, "Password should be below 20 characters long!"],
    },
    role: {
      type: String,
      enum: ["user", "owner"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("validate", function () {
  if (this.isNew && this.password !== this._repeatPassword) {
    throw new Error("Passwords missmatch!");
  }
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", userSchema);

export default User;
