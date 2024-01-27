export const ContractID = "0x34b54ff93cc80c99812eee63e2aa61977b7c61a0765179c819868bddc2164000"

export const ABI = {
    "source": {
        "hash": "0x3f82e086b06e91d9f89daf2a8bb24c601df18eb8722e3aa499a13200abd4c19a",
        "language": "ink! 4.2.0",
        "compiler": "rustc 1.69.0",
        "build_info": {
            "build_mode": "Debug",
            "cargo_contract_version": "3.2.0",
            "rust_toolchain": "stable-x86_64-unknown-linux-gnu",
            "wasm_opt_settings": {
                "keep_debug_symbols": false,
                "optimization_passes": "Z"
            }
        }
    },
    "contract": {
        "name": "phat_hello",
        "version": "0.1.0",
        "authors": [
            "Shelven Zhou <shelvenzhou@phala.network>"
        ]
    },
    "spec": {
        "constructors": [
            {
                "args": [],
                "default": false,
                "docs": [
                    "Constructor to initializes your contract"
                ],
                "label": "new",
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink_primitives",
                        "ConstructorResult"
                    ],
                    "type": 1
                },
                "selector": "0x9bae9d5e"
            }
        ],
        "docs": [],
        "environment": {
            "accountId": {
                "displayName": [
                    "AccountId"
                ],
                "type": 8
            },
            "balance": {
                "displayName": [
                    "Balance"
                ],
                "type": 11
            },
            "blockNumber": {
                "displayName": [
                    "BlockNumber"
                ],
                "type": 14
            },
            "chainExtension": {
                "displayName": [
                    "ChainExtension"
                ],
                "type": 15
            },
            "hash": {
                "displayName": [
                    "Hash"
                ],
                "type": 12
            },
            "maxEventTopics": 4,
            "timestamp": {
                "displayName": [
                    "Timestamp"
                ],
                "type": 13
            }
        },
        "events": [],
        "lang_error": {
            "displayName": [
                "ink",
                "LangError"
            ],
            "type": 3
        },
        "messages": [
            {
                "args": [
                    {
                        "label": "account",
                        "type": {
                            "displayName": [
                                "String"
                            ],
                            "type": 4
                        }
                    }
                ],
                "default": false,
                "docs": [
                    " A function to handle direct off-chain Query from users.",
                    " Such functions use the immutable reference `&self`",
                    " so WILL NOT change the contract state."
                ],
                "label": "get_eth_balance",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 5
                },
                "selector": "0x437a5ed1"
            }
        ]
    },
    "storage": {
        "root": {
            "layout": {
                "struct": {
                    "fields": [
                        {
                            "layout": {
                                "leaf": {
                                    "key": "0x00000000",
                                    "ty": 0
                                }
                            },
                            "name": "demo_field"
                        }
                    ],
                    "name": "PhatHello"
                }
            },
            "root_key": "0x00000000"
        }
    },
    "types": [
        {
            "id": 0,
            "type": {
                "def": {
                    "primitive": "bool"
                }
            }
        },
        {
            "id": 1,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 2
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 3
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 2
                    },
                    {
                        "name": "E",
                        "type": 3
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 2,
            "type": {
                "def": {
                    "tuple": []
                }
            }
        },
        {
            "id": 3,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "index": 1,
                                "name": "CouldNotReadInput"
                            }
                        ]
                    }
                },
                "path": [
                    "ink_primitives",
                    "LangError"
                ]
            }
        },
        {
            "id": 4,
            "type": {
                "def": {
                    "primitive": "str"
                }
            }
        },
        {
            "id": 5,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 6
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 3
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 6
                    },
                    {
                        "name": "E",
                        "type": 3
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 6,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 4
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 7
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 4
                    },
                    {
                        "name": "E",
                        "type": 7
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 7,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "index": 0,
                                "name": "InvalidEthAddress"
                            },
                            {
                                "index": 1,
                                "name": "HttpRequestFailed"
                            },
                            {
                                "index": 2,
                                "name": "InvalidResponseBody"
                            }
                        ]
                    }
                },
                "path": [
                    "phat_hello",
                    "phat_hello",
                    "Error"
                ]
            }
        },
        {
            "id": 8,
            "type": {
                "def": {
                    "composite": {
                        "fields": [
                            {
                                "type": 9,
                                "typeName": "[u8; 32]"
                            }
                        ]
                    }
                },
                "path": [
                    "ink_primitives",
                    "types",
                    "AccountId"
                ]
            }
        },
        {
            "id": 9,
            "type": {
                "def": {
                    "array": {
                        "len": 32,
                        "type": 10
                    }
                }
            }
        },
        {
            "id": 10,
            "type": {
                "def": {
                    "primitive": "u8"
                }
            }
        },
        {
            "id": 11,
            "type": {
                "def": {
                    "primitive": "u128"
                }
            }
        },
        {
            "id": 12,
            "type": {
                "def": {
                    "composite": {
                        "fields": [
                            {
                                "type": 9,
                                "typeName": "[u8; 32]"
                            }
                        ]
                    }
                },
                "path": [
                    "ink_primitives",
                    "types",
                    "Hash"
                ]
            }
        },
        {
            "id": 13,
            "type": {
                "def": {
                    "primitive": "u64"
                }
            }
        },
        {
            "id": 14,
            "type": {
                "def": {
                    "primitive": "u32"
                }
            }
        },
        {
            "id": 15,
            "type": {
                "def": {
                    "variant": {}
                },
                "path": [
                    "pink_extension",
                    "chain_extension",
                    "PinkExt"
                ]
            }
        }
    ],
    "version": "4"
}