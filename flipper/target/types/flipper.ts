export type Flipper = {
  "version": "0.1.0",
  "name": "flipper",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "switchAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "flip",
      "accounts": [
        {
          "name": "switchAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "switchAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "state",
            "type": "bool"
          }
        ]
      }
    }
  ]
};

export const IDL: Flipper = {
  "version": "0.1.0",
  "name": "flipper",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "switchAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "flip",
      "accounts": [
        {
          "name": "switchAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "switchAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "state",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
