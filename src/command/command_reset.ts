import {deleteAllUsers} from "../lib/db/queries/users";
import {deleteAllFeeds} from "../lib/db/queries/feeds";
import {deleteAllFeedFollows} from "../lib/db/queries/feed_follow";

export async function command_reset(_: string) {
    await deleteAllUsers();
    await deleteAllFeeds();
    await deleteAllFeedFollows();
    console.log("Successfully reset database.");
}