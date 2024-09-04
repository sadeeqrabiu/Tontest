import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/maps_struct_messages.tact',
    options: {
        debug: true,
    },
};
