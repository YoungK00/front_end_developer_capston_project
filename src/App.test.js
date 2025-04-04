import React, { useState } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NumberInput from "./components/res_NumberInput";
import BookingForm from "./BookingPage";
import { fetchAPI } from "../api";

// ✅ fetchAPI를 mocking
jest.mock("../api", () => ({
  fetchAPI: jest.fn(() => ["17:00", "18:00", "19:00"]),
}));

// ✅ NumberInput 컴포넌트 테스트
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

// ✅ BookingForm 테스트 추가
describe("BookingForm", () => {
  it("initializes available times using fetchAPI on mount", () => {
    render(<BookingForm submitForm={jest.fn()} />);

    // fetchAPI가 호출되었는지 확인
    expect(fetchAPI).toHaveBeenCalledTimes(1);

    // 초기 시간 리스트가 나타나는지 확인
    expect(screen.getByText("17:00")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
    expect(screen.getByText("19:00")).toBeInTheDocument();
  });

  it("updates available times when a date is selected", () => {
    render(<BookingForm submitForm={jest.fn()} />);

    // 날짜 버튼 중 하나 클릭 (예: "14")
    const dateButton = screen.getByText("14");
    fireEvent.click(dateButton);

    // fetchAPI가 두 번째 호출되었는지 확인
    expect(fetchAPI).toHaveBeenCalledTimes(2);

    // 갱신된 시간이 화면에 보이는지 확인
    expect(screen.getByText("17:00")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
  });
});
