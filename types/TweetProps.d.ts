type ITweetProps = {
    id: number;
    attributes: {
        tweet: string;
        ownersId: string;
        tweetsId: string;
        parent?: string;
        date: Date;
    };
};

