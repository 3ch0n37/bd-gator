import {XMLParser} from "fast-xml-parser";
import type {Feed, FeedItem} from "../types/feed";
import {getNextFeedToFetch, markFeedFetched} from "../lib/db/queries/feeds";
import {FeedRecord} from "../lib/db/schema";
import {createPost} from "../lib/db/queries/posts";

async function fetchPosts(feedUrl: string): Promise<Feed> {
    const response = await fetch(feedUrl, {
        headers: {
            "User-Agent": "gator"
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch feed: ${response.statusText}`);
    }
    const rawXML = await response.text();
    const parser = new XMLParser();
    const parsedXML = parser.parse(rawXML);
    if (!parsedXML.rss || !parsedXML.rss.channel) {
        throw new Error("Invalid feed format. 'channel' field is missing.");
    }
    const channel = parsedXML.rss.channel;
    if (!channel.title || typeof channel.title !== "string"
        || !channel.link || typeof channel.link !== "string"
        || !channel.description || typeof channel.description !== "string"
    ) {
        throw new Error("Invalid feed format. Missing required fields.");
    }
    const feedItems = [];
    if (channel.item && Array.isArray(channel.item)) {
        for (const item of channel.item) {
            if (!item.title || typeof item.title !== "string"
                || !item.link || typeof item.link !== "string"
                || !item.description || typeof item.description !== "string"
                || !item.pubDate
            ) {
                continue;
            }
            feedItems.push({
                title: item.title,
                link: item.link,
                description: item.description,
                pubDate: item.pubDate,
            });
        }
    }
    return {
        title: channel.title,
        link: channel.link,
        description: channel.description,
        items: feedItems,
    } as Feed;
}

async function savePosts(posts: FeedItem[], feedId: string) {
    for (const post of posts) {
        if(!post.link || !post.title || !post.description || !post.pubDate) {
            continue;
        }
        const publishedAt = new Date(post.pubDate);
        await createPost(post.title, post.link, post.description, feedId, publishedAt);
        console.log(`Saved post "${post.title}"`);
    }
}

export async function scrapeFeeds() {
    const feed = await getNextFeedToFetch();
    if (!feed) {
        console.log(`No feeds to fetch.`);
        return;
    }
    console.log(`Found a feed to fetch!`);
    await scrapeFeed(feed);
}

async function scrapeFeed(feed: FeedRecord) {
    await markFeedFetched(feed.id);
    console.log(`Fetching feed ${feed.name}...`);
    const feedData = await fetchPosts(feed.url);

    console.log(
        `Feed ${feed.name} collected, ${feedData.items.length} posts found`,
    );
    await savePosts(feedData.items, feed.id);
}

export function handleError(err: unknown) {
    console.error(
        `Error scraping feeds: ${err instanceof Error ? err.message : err}`,
    );
}