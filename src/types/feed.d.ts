export type Feed = {
    title: string;
    link: string;
    description: string;
    items: {
        title: string;
        link: string;
        description: string;
        pubDate: string;
    }[];
}