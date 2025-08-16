export type Feed = {
    title: string;
    link: string;
    description: string;
    items: FeedItem[];
}

export type FeedItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
}
