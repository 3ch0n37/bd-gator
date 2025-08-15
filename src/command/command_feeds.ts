import {getAllFeeds} from "../lib/db/queries/feeds";
import {getUserById} from "../lib/db/queries/users";
import type {FeedRecord, UserRecord} from "../lib/db/schema";

export async function command_feeds(_: string) {
    const allFeeds: FeedRecord[] = await getAllFeeds();
    const userMap = new Map<string, UserRecord>();
    for (const feed of allFeeds) {
        let user: UserRecord | undefined;
        if(!userMap.has(feed.userId)) {
            user = await getUserById(feed.userId);
            if (user) {
                userMap.set(feed.userId, user);
            }
        } else {
            user = userMap.get(feed.userId);
        }
        if (user) {
            console.log(`* ${feed.name} (${feed.url})`);
            console.log(`\tAdded by ${user.name}`);
        }
    }
}