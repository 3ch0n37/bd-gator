import {getUserByName} from "../lib/db/queries/users";
import {readConfig} from "../config";
import {getFeedByUrl} from "../lib/db/queries/feeds";
import {createFeedFollow, getFeedFollowsForUser} from "../lib/db/queries/feed_follow";

export async function command_follow(cmdName: string, ...args: string[]) {
    if (!args.length) {
        throw new Error("Feed URL name is required");
    }
    if (args.length > 1) {
        throw new Error("Too many arguments");
    }
    const feedUrl = args[0];
    console.log(`Following feed ${feedUrl}`);
    const user = await getUserByName(readConfig().currentUserName);
    if (!user) {
        throw new Error("Invalid user");
    }
    const feed = await getFeedByUrl(feedUrl);
    if (!feed) {
        throw new Error("Feed not found");
    }
    const newFollow = await createFeedFollow(user.id, feed.id);
    console.log(`User ${user.name} now follows feed ${feed.name}.`)
}

export async function command_following() {
    const user = await getUserByName(readConfig().currentUserName);
    if (!user) {
        throw new Error("Invalid user");
    }
    console.log(`User ${user.name} is following:`);
    const feedFollows = await getFeedFollowsForUser(user.id);
    for(const feedFollow of feedFollows) {
        console.log(` - ${feedFollow.feedName}`);
    }
    console.log();
}