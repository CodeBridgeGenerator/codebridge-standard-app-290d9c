import React from "react";
import { render, screen } from "@testing-library/react";

import ChataiPromptsEditDialogComponent from "../ChataiPromptsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders chataiPrompts edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ChataiPromptsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("chataiPrompts-edit-dialog-component")).toBeInTheDocument();
});
