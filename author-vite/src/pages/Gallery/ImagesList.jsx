import React, { useEffect, useState } from "react";
import ImageDetail from "./ImageDetail";
import { func } from "prop-types";

useEffect(() => {}, []);

export default function ImagesList() {
  const [images, setImages] = useState([]);

  return (
    <div>
      <ImageDetail />
    </div>
  );
}
