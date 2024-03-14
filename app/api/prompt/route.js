import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export const POST = async (request, {params}) => {
    try {
        const {currentSearch} = await request.json()
        await connectToDB();
        console.log(currentSearch)
        const regex = new RegExp(`.*${escapeRegex(currentSearch)}.*`, 'i');
        const prompts = await Prompt.find(currentSearch?{$or:[{tag:{$regex:regex}},{prompt:{$regex:regex}}]}:{}).populate('creator');
        return new Response(JSON.stringify(prompts),{status:200})

    } catch (error) {
        return new Response("Failed to fetch all prompts", {status:500})
    }
}