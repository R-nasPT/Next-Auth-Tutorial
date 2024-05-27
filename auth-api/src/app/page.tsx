import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="container mx-auto">
        <h3>Welcome to home page</h3>
        <hr className="my-3"/>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis odio
          ipsam facere dicta accusantium aliquam distinctio consequuntur
          perferendis. Iste numquam magni cum facere facilis quis quae optio
          voluptatibus saepe commodi!
        </p>
      </div>
    </main>
  );
}
