import { FC } from "react";

import { useNavigate } from "react-router-dom";

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.style";

import { DirectoryCategory } from "../directory/directory.component";

type DirectoryItemProps = {
  category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onRouteHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onRouteHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
