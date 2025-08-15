import {db} from "..";
import {feeds} from "../schema";
import {and, eq} from "drizzle-orm";

export async function getFeedByUrlAndUser(url: string, userId: string) {
    const [result] = await db.select().from(feeds).where(and(eq(feeds.url, url), eq(feeds.userId, userId)));
    return result;
}

export async function addFeed(name: string, url: string, userId: string) {
    const [result] = await db.insert(feeds).values({name: name, url: url, userId: userId}).returning();
    return result;
}

export async function deleteAllFeeds() {
    await db.delete(feeds);
}