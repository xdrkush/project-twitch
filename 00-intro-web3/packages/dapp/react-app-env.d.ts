/// <reference types="react-scripts" />

import { NonceManager } from "@ethersproject/experimental";
import { ExternalProvider } from "@ethersproject/providers";

import {
    Web3Provider,
    FallbackProvider,
    BaseProvider,
    JsonRpcSigner,
} from "@ethersproject/providers"
import { VoidSigner } from "ethers"

// --- provider ---
export type Provider = null | Web3Provider | FallbackProvider | BaseProvider

// declare global {
interface Window {
    ethereum?: any;
}
// }

