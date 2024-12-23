import { Pokemon, Habilidad, Movimientos } from "./types.ts";

export const resolvers = {
    Query: {
        pokemon: async (
            _: unknown,
            { name, id }: { name: string; id: number },
            __: unknown
        ): Promise<Pokemon> => {
            //Obtenemos los datos del Pokémon
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id || name}`);
            const data = await response.json();

            //Procesamos las habilidades
            const abilities: Habilidad[] = await Promise.all(
                data.abilities.map(async (ability: any) => {
                    const Response = await fetch(ability.ability.url);
                    const Data = await Response.json();

                    // Encuentramos la descripción del efecto en inglés
                    const effectEntry = Data.effect_entries.find((entry: any) => entry.language.name === "en");

                    return {
                        name: ability.ability.name,
                        effect: effectEntry ? effectEntry.effect : "No effect available",
                    };
                })
            );

            //Procesamos los movimientos
            const moves: Movimientos[] = await Promise.all(
                data.moves.map(async (move: any) => {
                    const Response = await fetch(move.move.url);
                    const Data = await Response.json();

                    return {
                        name: move.move.name,
                        power: Data.power ? Data.power.toString() : "N/A",
                    };
                })
            );

            return {
                id: data.id,  
                name: data.name,
                abilities,
                moves,
            };
        },
    },
};
