'use client';

interface ErrorHandlerProps {
  error: Error;
}

function ErrorHandler({ error }: ErrorHandlerProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}

export default ErrorHandler;
