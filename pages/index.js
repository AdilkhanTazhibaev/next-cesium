import Head from "next/head";
import dynamic from "next/dynamic";

const Map3D = dynamic(() => import("../components/Map3D/Map3D"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
      </Head>
      <Map3D />
    </>
  );
}
