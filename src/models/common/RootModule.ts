export interface Page {
  label: string;
  path: string;
  icon: JSX.Element;
  page: JSX.Element;
  index: number;
}

export interface RootModule {
  moduleName: string;
  pages: Page[];
}