import React from "react";
import { render, screen } from "@testing-library/react";

import ChataiConfigCreateDialogComponent from "../ChataiConfigCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders chataiConfig create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ChataiConfigCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("chataiConfig-create-dialog-component")).toBeInTheDocument();
});
