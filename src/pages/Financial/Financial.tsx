import { observer } from "mobx-react-lite";
import { test } from "../../shared/store/test";

const Financial = observer(() => {
  return (
    <>
      <h1>Financial</h1>
      <p>{test.value}</p>
      <p>{test.double}</p>
      <button
        type="button"
        onClick={() => {
          test.increment();
        }}
      >
        Increment
      </button>
    </>
  );
});

export default Financial;
