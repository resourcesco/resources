function run({ url }) {
  return { type: 'text', text: `docs for ${url}` }
}

import { AppSpec } from '../../services/app/App'

export default async function app(): Promise<AppSpec> {
  return {
    name: 'apiFinder',
    providers: {
      apiFinder: {
        path: [],
        actions: {
          lookup: {
            args: [],
            match: {
              type: 'url',
              host: '*',
              path: '*',
            },
          },
        },
      },
    },
    run,
  }
}
