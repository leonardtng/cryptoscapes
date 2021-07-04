export interface Subpage {
  path: string;
  page: JSX.Element;
}

export interface Page {
  label: string;
  path: string;
  icon: JSX.Element;
  page: JSX.Element;
  index: number;
  subpage?: Subpage;
}

export interface RootModule {
  moduleName: string;
  pages: Page[];
}