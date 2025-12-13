type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export const DURATION = {
  THREE_MS: 300,
  ONE_SEC: 1000,
};

export const onCheckType = (
  source: any,
  type: TypesBase,
): source is TypesBase => {
  return typeof source === type;
};

export const wait = (ms: number = DURATION.THREE_MS): Promise<void> =>
  new Promise<void>(resolve => setTimeout(resolve, ms));
