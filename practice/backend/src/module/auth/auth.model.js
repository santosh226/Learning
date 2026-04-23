import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true,
            trim: true,
            minlength: [6, "Password must be atleast 6 characters long"],
            maxlength: 50,
            Select: false
        },

        role: {
            type: String,
            enum: ["customer", "admin", "seller", "support"],
            default: "customer",
        },

        avatar: {
            type: String,
            default: false
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        verificationToken: { type: String, select: false },
        refreshToken: { type: String, select: false },
        resetPasswordToken: { type: String, select: false },
        resetPasswordExpires: { type: Date, select: false },
    },

    {
        timestamps: true
    }
)

userSchema.pre("save", async function() {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
})
userSchema.methods.comparePassword = async function(textPassword) {
    return bcrypt.compare(textPassword, this.password);
}

export default mongoose.model("User", userSchema);