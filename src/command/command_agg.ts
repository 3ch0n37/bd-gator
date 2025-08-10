import {fetchfeeds} from "../feeds/feeds";

export async function command_agg() {
    console.log(await fetchfeeds("https://www.wagslane.dev/index.xml"));
}