
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

export type profileNamesProps = {
    name: string;
}[];


export type statusProps = {
    'label': string,
    'StartStop': string,
    'StartStopDisabled': boolean,
    'Manual': boolean,
    'ManualDisabled': boolean,
    'ProfileName': string,
    'ProfileSelectDisabled': boolean,
}


