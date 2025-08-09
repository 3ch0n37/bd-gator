import {getAllUsers} from "../lib/db/queries/users";
import {readConfig} from "../config";

export async function command_users() {
    const allUsers = await getAllUsers();
    const currentUser = readConfig().currentUserName;
    for (const user of allUsers) {
        console.log(`* ${user.name}${user.name === currentUser ? " (current)" : ""}`);
    }
}