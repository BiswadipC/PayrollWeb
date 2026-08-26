export interface IApiErrorResponse
{
  title: string;
  status: number;
  errors: Record<string, string[]>;
} // interface...
