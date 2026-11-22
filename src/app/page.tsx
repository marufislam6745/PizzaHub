import Banner from "@/Components/Banner";
import PizzaSection from "@/Components/PizzaSection";
import Subscribe from "@/Components/Subscribe";


export default function Home() {
  return (
    <div className="bg-red-50">
      <Banner></Banner>
      <PizzaSection></PizzaSection>
      <Subscribe></Subscribe>
    </div>
  );
}
