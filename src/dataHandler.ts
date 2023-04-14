export type fastDataProps = [
    ...[time_ms: number, temperature: number, heat_factor: number],
][];

export type zonesStatusProps = [
    ...[{
        "time_ms": number,
        "temperature": number,
        "heat_factor": number,
        "slope": number,
        "pstdev": number,
        "target": number
    }],
][];