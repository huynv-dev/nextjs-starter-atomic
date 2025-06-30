// components/organisms/Modal/Modal.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";
import React from "react";

// Tạo div #modal-root giả lập
beforeAll(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
});

afterAll(() => {
  const modalRoot = document.getElementById("modal-root");
  if (modalRoot) modalRoot.remove();
});

describe("Modal", () => {
  it("renders modal content when open", () => {
    render(
      <Modal isOpen={true} onClose={() => { }} title="Test Modal">
        <p>Hello world</p>
      </Modal>
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  // it("calls onClose when backdrop is clicked", () => {
  //   const onClose = vi.fn();
  //   render(
  //     <Modal isOpen={true} onClose={onClose}>
  //       <p>Content</p>
  //     </Modal>
  //   );
  //   fireEvent.click(screen.getByTestId("modal-backdrop"));
  //   expect(onClose).toHaveBeenCalledTimes(1);
  // });

  it("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={() => { }}>
        <p>Hidden</p>
      </Modal>
    );
    expect(screen.queryByText("Hidden")).toBeNull();
  });
});
