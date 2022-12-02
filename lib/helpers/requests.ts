export const impoweredRequest = async (
    url: string,
    method: string,
    data: any
) => {

    let result = null;

    if (method == "GET" || method == "") {
        const response = await fetch(url, {
            method: method != "" ? method : "GET",
            headers: {
                "Content-Type": "application/json",
                "impowered-api-key": "9izyr03rp1czh8gzmf7mpr9ecrkbqq"
            }
        });
        result = await response.json();
    } else {
        const response = await fetch(url, {
            method: method != "" ? method : "GET",
            headers: {
                "Content-Type": "application/json",
                "impowered-api-key": "9izyr03rp1czh8gzmf7mpr9ecrkbqq"
            },
            body: JSON.stringify(data)
        });
        result = await response.json();
    }

    return result;

}