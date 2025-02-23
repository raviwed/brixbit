/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} public_key
* @param {Uint8Array} private_key
* @param {Uint8Array} message
* @returns {Uint8Array}
*/
export function user_preferences_encrypt(public_key: Uint8Array, private_key: Uint8Array, message: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} public_key
* @param {Uint8Array} private_key
* @param {Uint8Array} message
* @returns {Uint8Array}
*/
export function user_preferences_decrypt(public_key: Uint8Array, private_key: Uint8Array, message: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} private_key
* @returns {string}
*/
export function generate_private_preferences_topic(private_key: Uint8Array): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly user_preferences_encrypt: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly user_preferences_decrypt: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly generate_private_preferences_topic: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
