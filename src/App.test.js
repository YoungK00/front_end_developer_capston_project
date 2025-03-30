import React, { useState } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
//*import NumberInput from "../res_NumberInput";
import NumberInput from "./components/res_NumberInput";


// ✅ Wrapper 컴포넌트
const ControlledNumberInput = () => {
  const [value, setValue] = useState("1");
  return <NumberInput value={value} onChange={setValue} />;
};

describe("NumberInput", () => {
  it("increments and decrements properly within range", () => {
    render(<ControlledNumberInput />);

    const plusBtn = screen.getByText("+");
    const minusBtn = screen.getByText("-");

    fireEvent.click(plusBtn);
    expect(screen.getByRole("textbox").value).toBe("2");

    fireEvent.click(minusBtn);
    expect(screen.getByRole("textbox").value).toBe("1");

    fireEvent.click(minusBtn);
    expect(screen.getByRole("textbox").value).toBe("0");
  });

  it("does not go below 0", () => {
    render(<NumberInput value="0" onChange={jest.fn()} />);
    const minusBtn = screen.getByText("-");
    fireEvent.click(minusBtn);
    expect(screen.getByRole("textbox").value).toBe("0");
  });

  it("does not go above 20", () => {
    render(<NumberInput value="20" onChange={jest.fn()} />);
    const plusBtn = screen.getByText("+");
    fireEvent.click(plusBtn);
    expect(screen.getByRole("textbox").value).toBe("20");
  });

  it("calls onChange when input value is typed", () => {
    const handleChange = jest.fn();
    render(<NumberInput value="3" onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "5" } });
    expect(handleChange).toHaveBeenCalledWith("5");
  });
});
