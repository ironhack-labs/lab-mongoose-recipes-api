const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        unique: [true, "Title must be unique"]
    },
    instructions: {
        type: String,
        required: [true, "Instructions are required"]
    },
    level: {
        type: String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingedients: {
        type: [ String ],
    },
    image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
        type: Number,
        min: 0,
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
}, {
    // To display info about the creation and update
    timestamps: true,
    // Delete _id and __v and create id key
    toJSON: {
        transform: function(doc, ret) {
            delete ret._id;
            delete ret.__v;
            ret.id = doc.id;
            return ret;
        }
    }
}
)

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

