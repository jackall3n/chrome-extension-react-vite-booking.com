import { useEffect, useState } from "react";
import { sum } from "lodash";
import "./Component.css";

// @ts-ignore
import AnimatedNumber from "animated-number-react";

function App() {
  const [average, setAverage] = useState<number>();

  useEffect(() => {
    const interval = setInterval(() => {
      const prices = document.body.querySelectorAll(
        '[data-testid="price-and-discounted-price"]'
      );

      const mapped = Array.from(prices).map((element) => {
        const children = element.children;

        if (children.length === 0) {
          return "";
        }

        if (children.length === 1) {
          return element.textContent ?? "";
        }

        return children[1].textContent ?? "";
      });

      const formatted = mapped.filter(Boolean).map((value) => {
        return Number(value.replace(/[£,]/gim, ""));
      });

      console.log({ formatted });

      const average = sum(formatted) / formatted.length;

      setAverage(average);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute right-0 -top-4 bg-white z-20">
      <strong>Average Price: </strong>
      <span>
        <AnimatedNumber
          duration={500}
          value={average}
          formatValue={(value: number) =>
            new Intl.NumberFormat("en-GB", {
              currency: "GBP",
              style: "currency",
            }).format(value ?? "0")
          }
        />
      </span>
    </div>
  );
}

export default App;
