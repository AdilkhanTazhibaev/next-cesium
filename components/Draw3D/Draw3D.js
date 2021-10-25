import { useContext, useEffect, useState } from "react";
import { CustomReducer } from "../../redux/customReducer/customReducer";
import {
  Color,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cartesian3,
} from "cesium";
import { convertCartesianToEllipsoid } from "../../common/common";

export default function Draw3D() {
  const {
    state: { cesiumViewer },
  } = useContext(CustomReducer);
  const [handlerEvent, setHandlerEvent] = useState(null);

  function createPoint(worldPosition) {
    let point = cesiumViewer.entities.add({
      position: Cartesian3.fromDegrees(worldPosition[0], worldPosition[1]),
      point: {
        pixelSize: 50,
        color: new Color.fromCssColorString("#3399CC"),
      },
    });

    return point;
  }

  useEffect(() => {
    if (cesiumViewer) {
      if (handlerEvent) {
        handlerEvent.destroy();
      }

      let handler = new ScreenSpaceEventHandler(cesiumViewer.canvas);

      setHandlerEvent(handler);

      handler.setInputAction((event) => {
        let position = convertCartesianToEllipsoid(cesiumViewer, event);
        createPoint(position);
      }, ScreenSpaceEventType.LEFT_CLICK);
    }

    return () => {};
  }, []);

  return <div></div>;
}
