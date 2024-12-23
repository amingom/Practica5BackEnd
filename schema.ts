export const schema = `#graphql

type Pokemon {
    id: ID!
    name: String!
    abilities: [Habilidad!]!
    moves: [Movimientos!]!
}

type Habilidad {
    name: String!
    effect: String!
}

type Movimientos {
    name: String!
    power: String!
}

type Query {
    pokemon(name: String, id: Int): Pokemon
}
`
