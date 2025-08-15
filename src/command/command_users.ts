import {getAllUsers} from "../lib/db/queries/users";
import type {UserRecord} from "../lib/db/schema";

export async function command_users(_: string, currentUser: UserRecord) {
    const allUsers = await getAllUsers();
    for (const user of allUsers) {
        console.log(`* ${user.name}${user.name === currentUser.name ? " (current)" : ""}`);
    }
}