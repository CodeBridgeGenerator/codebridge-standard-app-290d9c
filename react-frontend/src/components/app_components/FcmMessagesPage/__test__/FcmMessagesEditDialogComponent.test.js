import React from "react";
import { render, screen } from "@testing-library/react";

import FcmMessagesEditDialogComponent from "../FcmMessagesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders fcmMessages edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FcmMessagesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("fcmMessages-edit-dialog-component")).toBeInTheDocument();
});
