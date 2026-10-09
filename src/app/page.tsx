import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import FallingProducts from "@/components/FallingProducts";
import RisingProducts from "@/components/RisingProducts";

export default function Home() {
  return (
    <>
      <Banner />
      <RisingProducts />
      <FallingProducts />
      <AllProducts/>
    </>
  );
}
