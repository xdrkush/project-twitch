
import {
    Web3Provider,
    FallbackProvider,
    BaseProvider
} from "@ethersproject/providers"

// --- provider ---
export type Provider = null | Web3Provider | FallbackProvider | BaseProvider

