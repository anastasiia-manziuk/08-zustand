'use client';

interface ErrorHandlerProps {
  error: Error;
}

function ErrorHandler({ error }: ErrorHandlerProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}

export default ErrorHandler;
