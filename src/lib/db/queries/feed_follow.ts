import {db} from "..";
import {feeds, users, feed_follows} from "../schema";
import {and, eq} from "drizzle-orm";

export async function createFeedFollow(userId: string, feedId: string) {
    const [newFeedFollow] = await db.insert(feed_follows).values({userId: userId, feedId: feedId}).returning();
    const [response] = await db
        .select({
            id: feed_follows.id,
            createdAt: feed_follows.createdAt,
            updatedAt: feed_follows.updatedAt,
            feedName: feeds.name,
            feedUrl: feeds.url,
            userName: users.name,
        })
        .from(feed_follows)
        .innerJoin(feeds, eq(feed_follows.feedId, feeds.id))
        .innerJoin(users, eq(feed_follows.userId, users.id))
        .where(eq(feed_follows.id, newFeedFollow.id));
    return response;
}

export async function getFeedFollowsForUser(userId: string) {
    return db
        .select({
            id: feed_follows.id,
            createdAt: feed_follows.createdAt,
            updatedAt: feed_follows.updatedAt,
            feedName: feeds.name,
            feedUrl: feeds.url,
            userName: users.name,
        })
        .from(feed_follows)
        .innerJoin(feeds, eq(feed_follows.feedId, feeds.id))
        .innerJoin(users, eq(feed_follows.userId, users.id))
        .where(eq(feed_follows.userId, userId));
}

export async function unfollow(feedId: string, userId: string) {
    const [unfollowed] = await db.delete(feed_follows).where(and(
        eq(feed_follows.feedId, feedId),
        eq(feed_follows.userId, userId)
    )).returning();
    return unfollowed;
}
