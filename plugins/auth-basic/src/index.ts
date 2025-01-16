import { PluginDefinition } from '@yaakapp/api';

export const plugin: PluginDefinition = {
  authentication: {
    name: 'Basic',
    config: [{
      type: 'text',
      name: 'username',
      label: 'Username',
      optional: true,
    }, {
      type: 'text',
      name: 'password',
      label: 'Password',
      optional: true,
    }],
    async onApply(_ctx: any, args: any): Promise<any> {
      const { username, password } = args.config;
      return {
        url: args.url,
        headers: [{
          name: 'Authorization',
          value: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
        }],
      };
    },
  },
};