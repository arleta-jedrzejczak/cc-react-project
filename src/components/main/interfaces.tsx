export interface searchInterface {
    input?: string;
    onChange?: (input: any) => void;
    keyword?: string;
    setKeyword?: (input: any) => void;
}

export interface postsInterface{
    postsState: any[];
}