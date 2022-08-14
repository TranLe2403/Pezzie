import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "../App";

describe("<App />", () => {
    it("should have input field with possibility of updating", () => {
        const component = render(<App />);
        const getElement = component.getByTestId("post-inputfield");

        fireEvent.change(getElement, { target: { value: 'This is my test post' } })

        expect(getElement).toHaveValue("This is my test post");
    });

    it("should reset inputfield to empty if clicking on send button",async () => {
        const component = render(<App />);
        const inputElement = component.getByTestId("post-inputfield");
        const buttonElement = component.getByTestId("send-button");

        fireEvent.change(inputElement, { target: { value: 'This is my second post' } });

        expect(inputElement).toHaveValue("This is my second post");
       
        fireEvent.click(buttonElement);
        
        expect(inputElement).toHaveValue("");
    });
});