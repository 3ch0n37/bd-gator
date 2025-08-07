import { readConfig, setUser } from "./config";

function main() {
    setUser("Vladimir");
    const config = readConfig();
    console.log(config);
}

main();
