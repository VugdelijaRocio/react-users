import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';

import './index.scss';

interface PropTypes {
    onSubmit: (value: string) => void;
}

export const SearchBox = (props: PropTypes) => {
    const { onSubmit} = props;
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

    const handleChange = (e: any) => {
        setSearchValue(e.target.value);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (searchValue && searchValue.trim() !== ""){
            onSubmit(searchValue);
        }
    }
    return (
        <form className="ui-search">
            <input
                className="ui-search-input"
                type="text"
                placeholder="Buscar..."
                onChange={handleChange}
                aria-label="Buscar..."
            />
            <button
                className="ui-search-btn"
                aria-label="Buscar"
                type="submit"
                onClick={handleSubmit}
            >
                <AiOutlineSearch />
            </button>
      </form>
    )
}