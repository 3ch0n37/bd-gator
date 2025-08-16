import {getPostsByUser} from "../lib/db/queries/posts";
import {UserRecord} from "../lib/db/schema";

export async function command_browse(cmdName: string, user: UserRecord, ...args: string[]) {
    let limit = 2;
    if (args.length == 1) {
        limit = parseInt(args[0]);
    }
    if (args.length > 1) {
        throw new Error("Too many arguments");
    }
    if (limit < 1) {
        throw new Error("Limit must be greater than 0");
    }
    const posts = await getPostsByUser(user.id, limit);
    for (const post of posts) {
        console.log(`* ${post.title} (${post.url})`)
        console.log(`\t${post.description}`);
    }
}