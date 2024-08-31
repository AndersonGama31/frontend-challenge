import { useQuery } from "@tanstack/react-query"
import * as charactersService from "./index"
import { ICharactersParams } from "./interface"

function useListCharacters(params: ICharactersParams) {
    return useQuery({
        queryKey: ["characters-list"],
        queryFn: () => charactersService.list(params)
    })
}

function useGetCharacter(id: string) {
    return useQuery({
        queryKey: ["character", id],
        queryFn: () => charactersService.get(id),
        enabled: !!id
    })
}

function useGetCharacterComics(id: string) {
    return useQuery({
        queryKey: ["character-comics", id],
        queryFn: () => charactersService.getComics(id),
        enabled: !!id
    })
}

export {
    useListCharacters,
    useGetCharacter,
    useGetCharacterComics
}