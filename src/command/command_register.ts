import {createUser, getUserByName} from "../lib/db/queries/users";
import {setUser} from "../config";

export async function command_register(cmdName: string, ...args: string[]) {
    if (!args.length) {
        throw new Error("User name is required");
    }
    if (args.length > 1) {
        throw new Error("Too many arguments");
    }
    const userName = args[0];
    const user = await getUserByName(userName);
    if (user) {
        throw new Error("User already exists");
    }
    const newUser = await createUser(userName);
    console.log(`Successfully registered user ${newUser.name}.`);
    setUser(userName);
    console.log(newUser);
}
