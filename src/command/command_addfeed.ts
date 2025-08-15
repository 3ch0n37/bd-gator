import {addFeed, getFeedByUrl} from "../lib/db/queries/feeds";
import {getUserByName} from "../lib/db/queries/users";
import {readConfig} from "../config";
import type {FeedRecord, UserRecord} from "../lib/db/schema";

function printFeed(feed: FeedRecord, user: UserRecord) {
    console.log(`* ${feed.name} (${feed.url})`);
    console.log(`\tAdded by ${user.name}`);
}

export async function command_addFeed(cmdName: string, ...args: string[]) {
    if (args.length < 2) {
        throw new Error("Name and URL are required");
    }
    if (args.length > 2) {
        throw new Error("Too many arguments");
    }
    const feedName = args[0];
    const feedUrl = args[1];
    console.log(`Adding feed "${feedName}" with URL "${feedUrl}"`);
    const currentUserName = readConfig().currentUserName;
    const user = await getUserByName(currentUserName);
    if (!user) {
        throw new Error("Invalid user");
    }
    const existingFeed = await getFeedByUrl(feedUrl);
    if (existingFeed) {
        throw new Error(`Feed with URL ${feedUrl} already added`);
    }
    const newFeed = await addFeed(feedName, feedUrl, user.id);
    console.log(`Successfully added feed:.`);
    printFeed(newFeed, user);
}