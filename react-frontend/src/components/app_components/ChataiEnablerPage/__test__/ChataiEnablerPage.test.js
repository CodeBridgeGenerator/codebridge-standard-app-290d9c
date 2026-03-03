import React from "react";
import { render, screen } from "@testing-library/react";

import ChataiEnablerPage from "../ChataiEnablerPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders chataiEnabler page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ChataiEnablerPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("chataiEnabler-datatable")).toBeInTheDocument();
    expect(screen.getByRole("chataiEnabler-add-button")).toBeInTheDocument();
});
