import React from "react";
import { render, screen } from "@testing-library/react";

import FcmQuesEditDialogComponent from "../FcmQuesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders fcmQues edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FcmQuesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("fcmQues-edit-dialog-component")).toBeInTheDocument();
});
