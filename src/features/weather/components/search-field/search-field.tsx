import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useLayoutEffect, useState } from "react";
import cities from "cities.json";
import "./search-field.css";
import { ICity } from "../../models";

interface ISearchField {
  onSelectionChange: (event: ICity) => void;
}

export const SearchField = ({ onSelectionChange }: ISearchField) => {
  const [citiesList, setCitiesList] = useState<ICity[]>([]);

  useLayoutEffect(() => {
    const mappedCities = (cities as ICity[]).map((c, i) => ({
      name: c.name,
      id: i,
    }));
    setCitiesList(mappedCities);
  }, []);

  return (
    <div className="search-field">
      <ReactSearchAutocomplete
        items={citiesList}
        onSelect={onSelectionChange}
        autoFocus
        placeholder="Search for cities"
      />
    </div>
  );
};
