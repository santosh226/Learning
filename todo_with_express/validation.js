const {z} = require("zod");

const todoSchema = z.object({
    todo: z.string().min(1, "Todo is required")
})

export default todoSchema;