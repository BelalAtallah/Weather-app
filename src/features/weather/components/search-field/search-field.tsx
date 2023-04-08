import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useEffect, useMemo, useState } from "react";
import cities from "cities.json";
import { ICity } from "../../models";
import "./search-field.css";

interface ISearchField {
  onSelectionChange: (event: ICity) => void;
}

export const SearchField = ({ onSelectionChange }: ISearchField) => {
  const [citiesList, setCitiesList] = useState<ICity[]>([]);

  const mappedCities = useMemo(() => {
    return (cities as ICity[]).map((city, index) => ({
      name: city.name,
      id: index,
    }));
  }, []);

  useEffect(() => {
    setCitiesList(mappedCities);
  }, [mappedCities]);

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
