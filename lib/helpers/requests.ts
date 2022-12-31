export const impoweredRequest = async (
    url: string,
    method: string,
    data: any
) => {

    let result = null;

    if (method == "GET") {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "impowered-api-key": "19uq99myrxd6jmp19k5mygo5d461l0"
            }
        });
        if (response.ok) {
            result = await response.json();
        } else {
            result = response.status;
            console.log(" - [FETCH] " + response.status);
        }
    } else {
        const response = await fetch(url, {
            method: method != "" ? method : "GET",
            headers: {
                "Content-Type": "application/json",
                "impowered-api-key": "19uq99myrxd6jmp19k5mygo5d461l0"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            result = await response.json();
        } else {
            result = response.status;
            console.log(" - [FETCH] " + response.status);
        }
    }

    return result;

}