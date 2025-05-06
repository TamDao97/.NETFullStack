export class BaseComponent {
  page = 1;
  pageSize = 10;
  gridData: any[] = [];
  totalRecord = 0;
  constructor() {}

  public setPageDefault(): any {
    return {
      page: this.page,
      pageSize: this.pageSize,
    };
  }

  protected gridLoadData(): void {
    console.log('gridLoadData');
  }
}
