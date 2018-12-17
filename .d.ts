// https://github.com/Microsoft/TypeScript/issues/15626
// https://stackoverflow.com/questions/35074713/extending-typescript-global-object-in-node-js

interface UiContainer {
  //TODO - why dont' these work?? 
  selector: string;
  click: Function;
}

interface ObjectConstructor {
  values: Function;
}
interface Client {
  //TODO - why dont' these work?? 

  checkDocument: Function;
}
interface AquiferOptions {
  wsLogin: string;
  wsPassword: string;
  wsUrl: string;
  wsApiKey: string;

  tableauLogin: string;
  tableauPassword: string;
  tableauUrl: string;

  hidePassword: boolean;
  noPics: boolean;
  muteConsole: boolean;
}

declare module NodeJS {
  interface Global {
    aquiferOptions: AquiferOptions;
    customScreenshotTag: string;
    previousImageFileLocation: string;
    doDeleteReferenceImage: boolean;
    log: Object;
  }
}
