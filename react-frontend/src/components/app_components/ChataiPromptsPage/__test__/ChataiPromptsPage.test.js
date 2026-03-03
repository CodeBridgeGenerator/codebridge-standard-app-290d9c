import React from "react";
import { render, screen } from "@testing-library/react";

import ChataiPromptsPage from "../ChataiPromptsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders chataiPrompts page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ChataiPromptsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("chataiPrompts-datatable")).toBeInTheDocument();
    expect(screen.getByRole("chataiPrompts-add-button")).toBeInTheDocument();
});
