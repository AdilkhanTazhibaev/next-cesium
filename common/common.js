import { Math as MathCesium } from "cesium";
export const convertCartesianToEllipsoid = (map3D, position) => {
  let ellipsoid = map3D.scene.globe.ellipsoid;
  let windowPosition = position.endPosition
    ? position.endPosition
    : position.position;
  let ray = map3D.camera.getPickRay(windowPosition);
  let cartesian = map3D.scene.globe.pick(ray, map3D.scene);
  if (cartesian) {
    let cartographic = ellipsoid.cartesianToCartographic(cartesian);
    return [
      MathCesium.toDegrees(cartographic.longitude),
      MathCesium.toDegrees(cartographic.latitude),
    ];
  } else {
    return [null, null];
  }
};
