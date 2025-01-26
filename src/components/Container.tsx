"use client"; // Indicate that this component uses client-side rendering
import React, { forwardRef, useImperativeHandle, useRef } from "react";

// Define an interface for the ref
interface ContainerRef {
  focus: () => void; // Method to focus the container
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// Use forwardRef to allow ref forwarding with a custom type
const Container = forwardRef<ContainerRef, ContainerProps>(
  ({ children, className, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);

    // Use useImperativeHandle to expose methods to the parent
    useImperativeHandle(ref, () => ({
      focus: () => {
        // Focus logic can be added here if needed
        if (innerRef.current) {
          innerRef.current.focus(); // Example of focusing on the container
        }
      },
      // You can add more methods here if necessary
    }));

    return (
      <div ref={innerRef} className={className} {...props}>
        {children}
      </div>
    );
  }
);

// Set a display name for better debugging
Container.displayName = "Container";

export default Container;
