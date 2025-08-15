import {getFeedByUrl} from "../lib/db/queries/feeds";
import {createFeedFollow, getFeedFollowsForUser, unfollow} from "../lib/db/queries/feed_follow";
import {UserRecord} from "../lib/db/schema";

export async function command_follow(cmdName: string, user: UserRecord, ...args: string[]) {
    if (!args.length) {
        throw new Error("Feed URL name is required");
    }
    if (args.length > 1) {
        throw new Error("Too many arguments");
    }
    const feedUrl = args[0];
    console.log(`Following feed ${feedUrl}`);
    const feed = await getFeedByUrl(feedUrl);
    if (!feed) {
        throw new Error("Feed not found");
    }
    await createFeedFollow(user.id, feed.id);
    console.log(`User ${user.name} now follows feed ${feed.name}.`)
}

export async function command_following(_: string, user: UserRecord) {
    console.log(`User ${user.name} is following:`);
    const feedFollows = await getFeedFollowsForUser(user.id);
    for(const feedFollow of feedFollows) {
        console.log(` - ${feedFollow.feedName}`);
    }
    console.log();
}

export async function command_unfollow (_: string, user: UserRecord, ...args: string[]) {
    if (!args.length) {
        throw new Error("Feed URL name is required");
    }
    if (args.length > 1) {
        throw new Error("Too many arguments");
    }
    const feedUrl = args[0];
    console.log(`Unfollowing feed ${feedUrl}`);
    const feed = await getFeedByUrl(feedUrl);
    if (!feed) {
        throw new Error("Feed not found");
    }
    await unfollow(feed.id, user.id);
    console.log(`User ${user.name} no longer follows feed ${feed.name}.`);
}