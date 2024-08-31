import { useQuery } from "@tanstack/react-query"
import * as charactersService from "./index"

function useGetCharacters(params: ICharactersParams) {
    return useQuery({
        queryKey: ["characters-list"],
        queryFn: () => charactersService.list(params)
    })
}

export {
    useGetCharacters
}