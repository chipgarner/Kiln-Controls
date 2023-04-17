
export type thermocoupleDataProps = {
    time_ms: number,
    temperature: number,
    heat_factor: number,
    error: number
};

export type tempDataProps = {
    time_ms: number;
    temperature: number;
    heat_factor: number;
    error: number
}[];


export type profileDataProps = {
    time_ms: number;
    temperature: number;
}[];

