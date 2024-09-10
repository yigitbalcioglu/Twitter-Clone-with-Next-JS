type IUserProps = {
    username: string;
    nickname?: string;
    Location?: string;
    StartDate: Date;
    userId: string;
    followingCount: number;
    followersCount: number;
    followedBy: string[];
};