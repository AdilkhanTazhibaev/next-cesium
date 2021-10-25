import React, { useRef, useEffect, useState } from "react";
import { Cesium3DTileset } from "resium";

import { Matrix4, Cartographic, Cartesian3 } from "cesium";

export default function Load3DModels() {
  const ref = useRef(null);
  const [matrix, setMatrix] = useState(null);

  useEffect(() => {
    if (ref.current && ref.current.cesiumElement !== null) {
      let offsetTile = ref.current.cesiumElement;
      let heightOffset = -320;

      offsetTile.readyPromise.then((tilest) => {
        let boundingSphere = tilest.boundingSphere;
        let cartographic = Cartographic.fromCartesian(boundingSphere.center);
        let surface = Cartesian3.fromRadians(
          cartographic.longitude,
          cartographic.latitude,
          0.0
        );
        let offset = Cartesian3.fromRadians(
          cartographic.longitude,
          cartographic.latitude,
          heightOffset
        );
        let translation = Cartesian3.subtract(
          offset,
          surface,
          new Cartesian3()
        );
        setMatrix(translation);
      });
    }
  }, []);

  return (
    <Cesium3DTileset
      modelMatrix={Matrix4.fromTranslation(matrix)}
      maximumScreenSpaceError={8}
      ref={ref}
      url={"/Sector_107_1_Cesium_crop/Sector_107_1_Cesium_crop.json"}
    />
  );
}
