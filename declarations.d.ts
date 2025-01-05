declare module 'axios-mock-adapter' {
  export default class MockAdapter {
    constructor(axiosInstance: any);
    onGet(url: string, config?: any): MockAdapter;
    onPost(url: string, data?: any, config?: any): MockAdapter;
    reply(statusCode: number, data?: any): void;
    restore(): void;
  }
}
