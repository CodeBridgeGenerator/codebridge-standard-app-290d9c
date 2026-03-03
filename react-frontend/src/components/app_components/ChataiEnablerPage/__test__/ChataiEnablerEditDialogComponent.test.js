import React from "react";
import { render, screen } from "@testing-library/react";

import ChataiEnablerEditDialogComponent from "../ChataiEnablerEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders chataiEnabler edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ChataiEnablerEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("chataiEnabler-edit-dialog-component")).toBeInTheDocument();
});
