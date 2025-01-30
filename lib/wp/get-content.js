export default async function GetContent(query) {
    const res = await fetch(
        `https://cms.drgrn.shop/graphql?query=${encodeURIComponent(query)}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 0,
            },
        }
    );

    const { data } = await res.json();

    return data;
}
