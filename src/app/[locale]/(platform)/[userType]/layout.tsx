import React from "react";

/**
 * Layout component that wraps its children and modal elements.
 *
 * This component renders a modal (if provided) and then renders the children components.
 * It serves as a layout wrapper for pages or components that need to include a modal.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the layout.
 * @param {React.ReactNode} props.modal - The modal content to be rendered above the children.
 *
 * @returns {JSX.Element} The rendered component.
 */
const Layout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <>
      {modal}
      {children}
    </>
  );
};

export default Layout;
