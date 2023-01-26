import React from "react";
import { render, screen } from "@testing-library/react-native";
import CustomModal from "../../components/reusable_components/CustomModal";
import { THEME } from "../../constants/Theme";
jest.useFakeTimers();

describe("CustomModal", () => {
  it("should render", () => {
    const tree = render(<CustomModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders the edit name modal correctly", () => {
    render(
      <CustomModal
        isModalVisible={true}
        setIsModalVisible={jest.fn()}
        modalType="EDIT_NAME"
        setModalType={jest.fn()}
        modalTitle="Edit Name"
        setModalTitle={jest.fn()}
        modalHeader={null}
        setModalHeader={jest.fn()}
        modalBody={null}
        setModalBody={jest.fn()}
        modalInputFields={[
          { label: "First Name", key: "FIRST_NAME_LABEL" },
          { label: "Last Name", key: "LAST_NAME_LABEL" },
        ]}
        setModalInputFields={jest.fn()}
        modalButtons={[
          {
            label: "Submit",
            buttonColor: THEME.colors.success,
            textColor: THEME.text.color,
            key: "SUBMIT_BUTTON",
          },
          {
            label: "Cancel",
            buttonColor: THEME.colors.danger,
            textColor: THEME.text.color,
            key: "CANCEL_BUTTON",
          },
        ]}
        setModalButtons={jest.fn()}
      />
    );
    const firstNameLabel = screen.getAllByText("First Name")[0];
    const lastNameLabel = screen.getAllByText("Last Name")[0];

    // Assert that all the parts of the modal that should be visible are visible
    expect(screen.getByText("Edit Name")).toBeTruthy();
    expect(firstNameLabel).toBeTruthy();
    expect(lastNameLabel).toBeTruthy();
    expect(screen.getByText("Submit")).toBeTruthy();
    expect(screen.getByText("Cancel")).toBeTruthy();

    // Assert that all the parts of the modal that should not be visible are not visible
    expect(screen.queryByTestId("modal-header")).toBeNull();
    expect(screen.queryByTestId("modal-body")).toBeNull();
  });

  it("does not render if isModalVisible is false", () => {
    render(
      <CustomModal
        isModalVisible={false}
        setIsModalVisible={jest.fn()}
        modalType="EDIT_NAME"
        setModalType={jest.fn()}
        modalTitle="Edit Name"
        setModalTitle={jest.fn()}
        modalHeader="Please enter your new name"
        setModalHeader={jest.fn()}
        modalBody={null}
        setModalBody={jest.fn()}
        modalInputFields={[
          { label: "First Name", key: "FIRST_NAME_LABEL" },
          { label: "Last Name", key: "LAST_NAME_LABEL" },
        ]}
        setModalInputFields={jest.fn()}
        modalButtons={[
          {
            label: "Submit",
            buttonColor: THEME.colors.success,
            textColor: THEME.text.color,
            key: "SUBMIT_BUTTON",
          },
          {
            label: "Cancel",
            buttonColor: THEME.colors.danger,
            textColor: THEME.text.color,
            key: "CANCEL_BUTTON",
          },
        ]}
        setModalButtons={jest.fn()}
      />
    );

    // Assert that nothing is visible
    expect(screen.queryByText("Edit Name")).toBeNull();
    expect(screen.queryByText("Please enter your new name")).toBeNull();
    expect(screen.queryByText("First Name")).toBeNull();
    expect(screen.queryByText("Last Name")).toBeNull();
    expect(screen.queryByText("Submit")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();
  });
});
