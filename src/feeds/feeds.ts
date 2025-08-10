import {XMLParser} from "fast-xml-parser";
import type {Feed} from "../types/feed";

export async function fetchfeeds(feedUrl: string): Promise<Feed> {
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
    const feed: Feed = {
        title: channel.title,
        link: channel.link,
        description: channel.description,
        items: []
    }
    if (channel.item && Array.isArray(channel.item)) {
        for (const item of channel.item) {
            if (!item.title || typeof item.title !== "string"
                || !item.link || typeof item.link !== "string"
                || !item.description || typeof item.description !== "string"
                || !item.pubDate || typeof item.pubDate !== "string"
            ) {
                throw new Error("Invalid feed format. Missing required fields.");
            }
            feed.items.push({
                title: item.title,
                link: item.link,
                description: item.description,
                pubDate: item.pubDate,
            });
        }
    }
    return feed;
}