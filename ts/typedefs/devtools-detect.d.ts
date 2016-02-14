declare module DevtoolsDetect {
    interface Devtools {
        open: boolean;
        orientation: string;
    }

    interface DevtoolsChangeEvent extends Event {
        detail: Devtools;
    }
}

declare var devtools: DevtoolsDetect.Devtools;

declare module "devtools-detect" {
    export = devtools;
}
