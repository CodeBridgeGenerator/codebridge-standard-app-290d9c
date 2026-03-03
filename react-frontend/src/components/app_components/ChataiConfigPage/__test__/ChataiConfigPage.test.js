import React from "react";
import { render, screen } from "@testing-library/react";

import ChataiConfigPage from "../ChataiConfigPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders chataiConfig page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ChataiConfigPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("chataiConfig-datatable")).toBeInTheDocument();
    expect(screen.getByRole("chataiConfig-add-button")).toBeInTheDocument();
});
