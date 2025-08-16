import {db} from "..";
import {feeds, posts, feed_follows} from "../schema";
import {eq} from "drizzle-orm";
import {firstOrUndefined} from "../utils";

export async function createPost(title: string, url: string, description: string, feedId: string, publishedAt: Date) {
    const existingPost = await db.select().from(posts).where(eq(posts.url, url));
    if (existingPost) {
        return;
    }
    const result = await db.insert(posts).values({title: title, url: url, description: description, feedId: feedId, publishedAt: publishedAt}).returning();
    return firstOrUndefined(result);
}

export async function getPostsByUser(userId: string, numberOfPosts = 5) {
    return db
        .select({
            id: posts.id,
            title: posts.title,
            url: posts.url,
            description: posts.description,
            publishedAt: posts.publishedAt,
            feedName: feeds.name,
            feedUrl: feeds.url,
        })
        .from(posts)
        .innerJoin(feeds, eq(posts.feedId, feeds.id))
        .innerJoin(feed_follows, eq(feed_follows.feedId, feeds.id))
        .where(eq(feed_follows.userId, userId))
        .orderBy(posts.publishedAt)
        .limit(numberOfPosts);
}