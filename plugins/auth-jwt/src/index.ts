import { PluginDefinition } from '@yaakapp/api';
import jwt from 'jsonwebtoken';

const algorithms = [
  'HS256',
  'HS384',
  'HS512',
  'RS256',
  'RS384',
  'RS512',
  'PS256',
  'PS384',
  'PS512',
  'ES256',
  'ES384',
  'ES512',
];

const defaultAlgorithm = algorithms[0];

export const plugin: PluginDefinition = {
    authentication: {
      name: 'jwt',
      label: 'JWT Bearer',
      shortLabel: 'JWT',
      config: [
        {
          type: 'select',
          name: 'algorithm',
          label: 'Algorithm',
          defaultValue: defaultAlgorithm,
          options: algorithms.map(value => ({ name: value, value })),
        },
        {
          type: 'text',
          name: 'secret',
          label: 'Secret',
          optional: true,
        },
        {
          type: 'checkbox',
          name: 'secretBase64',
          label: 'Secret Base64 Encoded',
        },
        {
          type: 'editor',
          name: 'payload',
          label: 'Payload',
          language: 'json',
          optional: true,
        },
      ],
      async onApply(_ctx, args) {
        const { algorithm, secret: _secret, secretBase64, payload } = args.config;
        const secret = secretBase64 ? Buffer.from(`${_secret}`, 'base64') : `${_secret}`;
        const token = jwt.sign(`${payload}`, secret, { algorithm: algorithm as any });
        return {
          url: args.url,
          headers: [{ name: 'Authorization', value: `Bearer ${token}` }],
        };
      }
      ,
    },
  }
;
