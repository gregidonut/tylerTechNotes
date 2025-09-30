import axios from "axios";

export default async function (): Promise<Array<any>> {
    const { data } = await axios({
        method: "get",
        url: "/api/tickets/get",
    });
    return data;
}
