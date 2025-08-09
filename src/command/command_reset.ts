import {deleteAllUsers} from "../lib/db/queries/users";

export async function command_reset(_: string) {
    await deleteAllUsers();
    console.log("Successfully reset database.");
}