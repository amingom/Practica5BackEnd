export type Pokemon = {
    id: string,
    name: string,
    abilities: Habilidad[],
    moves: Movimientos[],
}

export type Habilidad = {
    name: string,
    effect: string,
}

export type Movimientos = {
    name: string,
    power: string,
}