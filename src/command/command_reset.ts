import {deleteAllUsers} from "../lib/db/queries/users";
import {deleteAllFeeds} from "../lib/db/queries/feeds";

export async function command_reset(_: string) {
    await deleteAllUsers();
    await deleteAllFeeds();
    console.log("Successfully reset database.");
}