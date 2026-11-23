import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import PizzaSection from "@/components/PizzaSection";
import Subscribe from "@/components/Subscribe";


export default function Home() {
  return (
    <div className="bg-red-50">
      <Banner></Banner>
      <PizzaSection></PizzaSection>
      <Subscribe></Subscribe>
      <Footer></Footer>
    </div>
  );
}
