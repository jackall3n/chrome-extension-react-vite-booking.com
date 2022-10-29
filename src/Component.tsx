import { useEffect, useState } from "react";
import "./App.css";

import "chrome";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const prices = document.querySelector(
        '[data-test="price-and-discounted-price"]'
      );

      console.log(prices);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 w-[200px] bg-white z-20">
      Statistics
    </div>
  );
}

export default App;
