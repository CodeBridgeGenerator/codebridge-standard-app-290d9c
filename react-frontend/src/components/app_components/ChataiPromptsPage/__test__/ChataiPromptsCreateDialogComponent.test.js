import React from "react";
import { render, screen } from "@testing-library/react";

import ChataiPromptsCreateDialogComponent from "../ChataiPromptsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders chataiPrompts create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ChataiPromptsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("chataiPrompts-create-dialog-component")).toBeInTheDocument();
});
