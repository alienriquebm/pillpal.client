import { ErrorAction } from './error-action';
import { IS_PROD } from '../config';
import type React from 'react';
import type { HttpError } from '../api/config';

interface IErrorBoundaryMessage {
  error: HttpError;
}

export const ErrorBoundaryMessage: React.FC<IErrorBoundaryMessage> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ErrorAction
        error={IS_PROD ? undefined : error}
        message={IS_PROD ? 'Ocurrió un error en la escena' : undefined}
        extra={IS_PROD ? null : error.stack}
      />
    </div>
  );
};
