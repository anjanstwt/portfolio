export enum DetailType {
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    ADDRESS = 'ADDRESS',
    LINKEDIN = 'LINKEDIN',
    GITHUB = 'GITHUB',
    X = "X",
    RESUME = "RESUME",
}

export type DetailsType = {
    type: DetailType,
    logo: React.ElementType,
    link: string,
    tooltip: string,
    label: string,
};