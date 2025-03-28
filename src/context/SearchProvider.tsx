import { createContext, useState } from "react";

export const SearchContext = createContext({})

type searchContextProps = {
    children: React.ReactNode
}

const SearchProvider = ({children}:searchContextProps) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [sortQuery, setSortQuery] = useState("")

    const value = {
        searchQuery,
        setSearchQuery,
        sortQuery,
        setSortQuery
    }

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchProvider
