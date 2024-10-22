'use client';
import ErrorComponent, {
  ErrorProps,
} from '@/components/UI/ErrorComponent/ErrorComponent';

export default function Error({ error, reset }: ErrorProps) {
  return <ErrorComponent error={error} reset={reset} />;
}
