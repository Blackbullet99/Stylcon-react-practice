import { createContext, useState, useEffect } from "react";

import { getCollectionAndDocument } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesNap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCollectionAndDocument();
      setCategoriesNap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
