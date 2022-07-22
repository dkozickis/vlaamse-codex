export type APICallReturnBase<ReturnKeys extends keyof any> = {
  results: {
    bindings: Record<ReturnKeys, { value: string }>[];
  };
};
