import { ReactNode } from 'react';

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export interface ReactChildrenProps {
  children: ReactNode;
}
