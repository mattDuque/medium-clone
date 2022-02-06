export interface Post {
    _id: string;
    _createdAt: string;
    timeToRead: string;
    title: string;
    author: {
        name: string;
        image: string;
    };
    description: string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    body: [object];
}

export interface Categories {
    title: string;
    description: string;
}