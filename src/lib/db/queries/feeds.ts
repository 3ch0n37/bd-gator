import {db} from "..";
import {feeds} from "../schema";
import {Feed} from "src/types/feed";
import {getUserByName} from "./users";
import {readConfig} from "../../../config";

export type FeedRecord = typeof feeds.$inferSelect;
type NewFeed = Partial<FeedRecord>;

export async function addFeed(feed: Feed) {
    const user = await getUserByName(readConfig().currentUserName);
    const feedRecord: NewFeed = {
        name: feed.title,
        url: feed.link,
        userId: user.id,
    }
    const [result] = await db.insert(feeds).values(feedRecord).returning();
    return result;
}