import type React from 'react';
import { withErrorBoundary as withErrorBoundaryHoc } from 'react-error-boundary';
import { ErrorBoundaryMessage } from '../components/error-boundary-message';

export const withErrorBoundary = (component: React.FC) =>
  withErrorBoundaryHoc(component, { FallbackComponent: ErrorBoundaryMessage });
